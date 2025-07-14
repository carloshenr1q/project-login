import React from 'react';
import { Stack } from 'expo-router';
import { Animated, Easing, StatusBar } from 'react-native';

const forCarouselSlide = (props: any) => {
  const { current, next, inverted, layouts } = props;
  const progress = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const rotateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'],
  });

  return {
    cardStyle: {
      transform: [
        { perspective: 1000 },
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
            inverted
          ),
        },
        { rotateY },
      ],
    },
  };
};

const forCarouselSlideReverse = (props: any) => {
  const { current, next, inverted, layouts } = props;
  const progress = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const rotateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  return {
    cardStyle: {
      transform: [
        { perspective: 1000 },
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
            inverted
          ),
        },
        { rotateY },
      ],
    },
  };
};

export default function Layout() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack
        screenOptions={({ route, navigation }) => {
          const routes = navigation.getState()?.routes;
          const index = routes?.findIndex(r => r.key === route.key) ?? 0;

          let cardStyleInterpolator = forCarouselSlide;

          if (routes && index > 0) {
            const prevRoute = routes[index - 1];
            if (
              (prevRoute.name === 'index' && route.name === 'create-account') ||
              (prevRoute.name === 'create-account' && route.name === 'index')
            ) {
              if (prevRoute.name === 'index' && route.name === 'create-account') {
                cardStyleInterpolator = forCarouselSlide;
              } else if (prevRoute.name === 'create-account' && route.name === 'index') {
                cardStyleInterpolator = forCarouselSlideReverse;
              }
            }
          }

          return {
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 1500,
                  easing: Easing.out(Easing.poly(5)),
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 1500,
                  easing: Easing.out(Easing.poly(5)),
                },
              },
            },
          };
        }}
      />
    </>
  );
}