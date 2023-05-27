// @flow
import * as React from 'react';
import { GetStaticPaths } from 'next';
import { selectUser } from '@/redux/features/users/userSlice';
import { wrapper } from '@/redux/app/store';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
type Props = {
  userData: User;
};
const About = ({ userData }: Props): React.ReactElement => {
  // return <div>{userData.first_name}</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    console.log(context);
    const id = context?.params?.id?.toString()!;
    const userData = useSelector(selectUser(id));
    return {
      props: { userData },
    };
  }
);

export default About;
