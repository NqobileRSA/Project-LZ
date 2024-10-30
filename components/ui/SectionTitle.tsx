import React from 'react';

type Props = {
  title: string;
};

const SectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center w-full my-8">
      <div className="flex-grow h-[5px] bg-white"></div>
      <h2 className="mx-4 text-2xl font-bold text-white uppercase">{title}</h2>
      <div className="flex-grow h-[5px] bg-white"></div>
    </div>
  );
};

export default SectionTitle;
