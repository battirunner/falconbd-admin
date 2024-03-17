import React from 'react';

const Status: React.FC<{ statusType: string }> = ({ statusType }) => {
  console.log('check the status', statusType);

  interface colorType {
    type: string;
    bg: string;
    text: string;
    value: string;
  }

  const color: colorType[] = [
    {
      type: 'PENDING',
      bg: 'red-100',
      text: 'red-800',
      value: 'Pending',
    },
    {
      type: 'PROCESSING',
      bg: 'yellow-100',
      text: 'yellow-800',
      value: 'Processing',
    },
    {
      type: 'READY_TO_RECEIVE',
      bg: 'purple-100',
      text: 'purple-800',
      value: 'Ready',
    },
    {
      type: 'RECEIVED',
      bg: 'blue-100',
      text: 'blue-800',
      value: 'Received',
    },
    {
      type: 'COMPLETED',
      bg: 'green-100',
      text: 'green-800',
      value: 'Completed',
    },
  ];

  return (
    <>
      <span
        className={`bg-${color.find((cl) => cl.type === statusType)
          ?.bg} text-${color.find((cl) => cl.type === statusType)
          ?.text} text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}
      >
        {color.find((cl) => cl.type === statusType)?.value}
      </span>
    </>
  );
};

export default Status;
