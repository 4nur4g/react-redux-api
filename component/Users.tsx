// @flow
import * as React from 'react';

type Props = {
  list: Array<any>;
};
export const Users = ({ list }: Props) => {
  return (
    <div className="flex flex-col h-screen place-content-center">
      <ul className="w-1/4 self-center">
        {list.map(item => (
          <li className=" bg-pinkish mb-2 p-2 rounded shadow" key={item.id}>
            {`${item.id}.`} {item.first_name} {item.last_name}
          </li>
        ))}
      </ul>
      <div className="flex w-1/2 justify-between self-center">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
          Prev
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
    </div>
  );
};
