import React from "react";
import Swiper from "react-native-swiper";
import Onboarding from '../Onbording';
import Onboarding2 from '../Onbording2';
import Onboarding3 from '../Onbording3';
import Onboarding4 from '../Onbording4';
import Onboarding5 from '../Onbording5';

export default function OnboardingMain({ navigation }) {
  let swiperRef = null;

  const goNext = () => {
    swiperRef.scrollBy(1);
  };

  const finish = () => {
    navigation.replace("RoleSelect");
  };

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dotColor="white"
      activeDotColor="#3EB489"
      ref={(ref) => (swiperRef = ref)}
    >
      <Onboarding onNext={goNext} />
      <Onboarding2 onNext={goNext} />
      <Onboarding3 onNext={goNext} />
      <Onboarding4 onNext={goNext} />
      <Onboarding5 onNext={finish} />
    </Swiper>
  );
}
