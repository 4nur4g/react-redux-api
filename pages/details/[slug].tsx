// @flow
import * as React from 'react';
import { useUser } from '@/redux/app/hooks';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Image from 'next/image';

const About = (): React.ReactElement => {
  const {
    query: { slug: id },
  } = useRouter();

  const router = useRouter();
  const userData: User | undefined = useUser(+id!);

  return userData ? (
    <div className="h-screen w-screen flex flex-col justify-center place-items-center gap-4">
      <div className="grid grid-cols-[max-content_auto] gap-6 max-w-xl p-8 mx-auto bg-slate-800 rounded-lg items-center">
        <Image
          src={userData.avatar}
          alt={userData.first_name}
          width={80}
          height={80}
          className="rounded-full self-center"
        ></Image>
        <div className="text-white  ">
          <p className="text-lg">{`${userData.first_name} ${userData.last_name}`}</p>
          <p className="">{userData.email}</p>
        </div>
      </div>
      <button
        onClick={() => router.back()}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded "
      >
        Go back
      </button>
    </div>
  ) : (
    <Error statusCode={404} />
  );
};

export default About;
