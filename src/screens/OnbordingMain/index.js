// import React from "react";
// import Swiper from "react-native-swiper";
// import Onbording from '../Onbording';
// import Onbording2 from '../Onbording2';
// import Onbording3 from '../Onbording3';
// import Onbording4 from '../Onbording4';
// import Onbording5 from '../Onbording5';

// export default function OnbordingMain({ navigation }) {
//   let swiperRef = null;

//   const goNext = () => {
//     swiperRef.scrollBy(1);
//   };

//   const finish = () => {
//     navigation.replace("RoleSelect");
//   };

//   return (
//     <Swiper
//       loop={false}
//       showsPagination={true}
//       dotColor="white"
//       activeDotColor="#3EB489"
//       ref={(ref) => (swiperRef = ref)}
//     >
//       <Onbording onNext={goNext} />
//       <Onbording2 onNext={goNext} />
//       <Onbording3 onNext={goNext} />
//       <Onbording4 onNext={goNext} />
//       <Onbording5 onNext={finish} />
//     </Swiper>
//   );
// }
