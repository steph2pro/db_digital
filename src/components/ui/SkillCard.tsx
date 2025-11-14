import React from 'react';

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  color: string; // blue, green, purple, orange
  icon: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({ title, skills, color, icon }) => {
  const colorBgMap: Record<string, string> = {
    blue: "bg-blue-100",
    green: "bg-green-100",
    purple: "bg-purple-100",
    orange: "bg-orange-100",
  };

  const colorIconMap: Record<string, string> = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-custom shadow-custom p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 ${colorBgMap[color]} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-2xl ${colorIconMap[color]}`}></i>
        </div>
        <h3 className="text-xl font-semibold font-title text-secondary dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
