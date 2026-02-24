import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from "motion/react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { ContactLayout } from '../components/sections/contact/ContactLayout';
import { contactImages, offices } from '../data/contactData';

// Import Leaflet (à installer: npm install leaflet @types/leaflet)
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Correction des icônes par défaut de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const LocationPage: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Initialisation de la carte Leaflet
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    try {
      // Coordonnées du Cameroun (centre approximatif)
      const cameroonCenter: L.LatLngExpression = [7.3697, 12.3547];
      
      // Création de la carte
      const map = L.map(mapRef.current).setView(cameroonCenter, 6);
      
      // Ajout du fond de carte (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        className: isDark ? 'map-dark' : '',
      }).addTo(map);

      // Création des marqueurs personnalisés pour chaque bureau
      offices.forEach((office) => {
        // Création d'une icône personnalisée
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-pulse" style="background: ${office.color}">
              <div class="marker-inner" style="background: ${office.color}"></div>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -15],
        });

        // Création du marqueur
        const marker = L.marker([office.coordinates.lat, office.coordinates.lng], {
          icon: customIcon,
          riseOnHover: true,
        }).addTo(map);

        // Popup avec les informations du bureau
        marker.bindPopup(`
          <div class="map-popup ${isDark ? 'dark' : ''}">
            <h3 class="font-bold">${office.city}, ${office.country}</h3>
            <p class="text-sm">${office.address}</p>
            <p class="text-sm mt-1">📞 ${office.phones[0]}</p>
            ${office.email ? `<p class="text-sm">✉️ ${office.email}</p>` : ''}
            <p class="text-sm">🕒 ${office.workingHours}</p>
            <button onclick="window.selectOffice('${office.id}')" 
                    class="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
              Voir les détails
            </button>
          </div>
        `);

        // Gestion des événements
        marker.on('click', () => {
          setSelectedOffice(office);
          map.setView([office.coordinates.lat, office.coordinates.lng], 10);
        });

        markersRef.current.push(marker);
      });

      // Ajuster la vue pour voir tous les marqueurs
      if (offices.length > 1) {
        const bounds = L.latLngBounds(offices.map(o => [o.coordinates.lat, o.coordinates.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }

      leafletMapRef.current = map;
      setMapLoaded(true);

      // Fonction globale pour sélectionner un bureau depuis le popup
      (window as any).selectOffice = (officeId: string) => {
        const office = offices.find(o => o.id === officeId);
        if (office) {
          setSelectedOffice(office);
          map.setView([office.coordinates.lat, office.coordinates.lng], 10);
        }
      };

    } catch (error) {
      console.error('Erreur lors du chargement de la carte:', error);
      setMapError(true);
    }

    // Nettoyage
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
      delete (window as any).selectOffice;
    };
  }, [isDark]);

  // Mettre à jour le thème de la carte
  useEffect(() => {
    if (!leafletMapRef.current) return;
    
    // Mise à jour du style des tuiles pour le thème sombre/clair
    leafletMapRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        (layer as any).options.className = isDark ? 'map-dark' : '';
        layer.redraw();
      }
    });
  }, [isDark]);

  // Centrer sur le bureau sélectionné
  useEffect(() => {
    if (!leafletMapRef.current || !selectedOffice) return;

    leafletMapRef.current.setView(
      [selectedOffice.coordinates.lat, selectedOffice.coordinates.lng],
      12,
      { animate: true }
    );

    // Ouvrir le popup du bureau sélectionné
    markersRef.current.forEach((marker, index) => {
      if (offices[index].id === selectedOffice.id) {
        marker.openPopup();
      } else {
        marker.closePopup();
      }
    });
  }, [selectedOffice]);

  return (
    <ContactLayout
      title="location"
      subtitle={t('contact.location.subtitle', 'Retrouvez-nous dans nos bureaux au Cameroun')}
      image={contactImages.location}
    >
      <style>{`
        .map-dark {
          filter: brightness(0.8) invert(0.9) hue-rotate(180deg);
        }
        
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .marker-pulse {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0, 230, 118, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }
        
        .marker-inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00e676;
          border: 2px solid white;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 230, 118, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(0, 230, 118, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 230, 118, 0);
          }
        }
        
        .map-popup {
          padding: 10px;
          border-radius: 8px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .map-popup.dark {
          background: #1a1a1a;
          color: white;
        }
        
        .map-popup.dark button {
          background: #00e676;
          color: #1a1a1a;
        }
        
        .leaflet-popup-content {
          margin: 10px;
        }
        
        .leaflet-container {
          font-family: system-ui, -apple-system, sans-serif;
        }
      `}</style>

      <div ref={sectionRef} className="space-y-8">
        {/* Carte interactive Leaflet */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          {/* Conteneur de la carte */}
          <div ref={mapRef} className="absolute inset-0" />

          {/* Indicateur de chargement */}
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-80 z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full"
              />
            </div>
          )}

          {/* Message d'erreur */}
          {mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-90 z-10">
              <div className="text-center p-6">
                <i className="bx bx-error-circle text-4xl text-red-500 mb-3" />
                <h3 className="text-lg font-bold mb-2">Erreur de chargement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Impossible de charger la carte. Veuillez réessayer.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Réessayer
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Sélecteur de bureau */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {offices.map((office, index) => (
            <motion.button
              key={office.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedOffice(office)}
              className={`relative px-4 py-2 rounded-full overflow-hidden ${
                selectedOffice.id === office.id
                  ? 'text-white shadow-lg'
                  : isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {selectedOffice.id === office.id && (
                <motion.div
                  layoutId="office-bg"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${office.color}, ${office.color}80)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg">{office.countryCode === 'CM' ? '🇨🇲' : '🌍'}</span>
                {office.city}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Détails du bureau sélectionné */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOffice.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative mt-8"
          >
            {/* Carte de détail */}
            <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border ${
              isDark
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-gray-200'
            }`}>
              {/* Image de fond */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedOffice.image})` }}
                />
                <div className={`absolute inset-0 ${
                  isDark ? 'bg-black/60' : 'bg-white/60'
                }`} />
                
                {/* Overlay avec informations */}
                <div className="relative h-full flex items-end p-6">
                  <div>
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl mb-2"
                    >
                      {selectedOffice.countryCode === 'CM' ? '🇨🇲' : '🌍'}
                    </motion.div>
                    <h2 className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedOffice.city}, {selectedOffice.country}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0"
                       style={{ background: `linear-gradient(135deg, ${selectedOffice.color}, ${selectedOffice.color}80)` }}>
                    <i className="bx bx-map text-white" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('contact.location.address', 'Adresse')}
                    </h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedOffice.address}
                    </p>
                    {selectedOffice.addressDetail && (
                      <p className={`text-sm mt-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {selectedOffice.addressDetail}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0"
                       style={{ background: `linear-gradient(135deg, ${selectedOffice.color}, ${selectedOffice.color}80)` }}>
                    <i className="bx bx-phone text-white" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('contact.location.phones', 'Téléphone')}
                    </h3>
                    <div className="space-y-1">
                      {selectedOffice.phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className={`block hover:text-green-500 transition-colors ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedOffice.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0"
                         style={{ background: `linear-gradient(135deg, ${selectedOffice.color}, ${selectedOffice.color}80)` }}>
                      <i className="bx bx-envelope text-white" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold mb-1 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email
                      </h3>
                      <a
                        href={`mailto:${selectedOffice.email}`}
                        className={`hover:text-green-500 transition-colors ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {selectedOffice.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0"
                       style={{ background: `linear-gradient(135deg, ${selectedOffice.color}, ${selectedOffice.color}80)` }}>
                    <i className="bx bx-time text-white" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t('contact.location.hours', 'Horaires')}
                    </h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedOffice.workingHours}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <motion.a
                    href={`https://www.google.com/maps/search/?api=1&query=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white text-sm font-bold rounded-lg text-center"
                  >
                    <i className="bx bx-navigation mr-2" />
                    {t('contact.location.getDirections', 'Obtenir l\'itinéraire')}
                  </motion.a>
                  <motion.a
                    href={`tel:${selectedOffice.phones[0].replace(/\s/g, '')}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold text-center border ${
                      isDark
                        ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
                    }`}
                  >
                    <i className="bx bx-phone mr-2" />
                    {t('contact.location.call', 'Appeler')}
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Statistiques des bureaux */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
        >
          {[
            { label: t('contact.location.stats.cities', 'Villes'), value: offices.length, icon: 'bx bx-building-house' },
            { label: t('contact.location.stats.hours', 'Heures d\'ouverture'), value: '54h/sem', icon: 'bx bx-time' },
            { label: t('contact.location.stats.team', 'Équipe locale'), value: '25+', icon: 'bx bx-group' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -3 }}
              className={`p-4 rounded-xl backdrop-blur-sm border text-center ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700'
                  : 'bg-white/50 border-gray-200'
              }`}
            >
              <i className={`${stat.icon} text-2xl mb-2 text-green-500`} />
              <div className="text-xl font-bold text-green-500">{stat.value}</div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ContactLayout>
  );
};

export default LocationPage;