import { useNavigation } from '@react-navigation/native';

export const useNavigateToScreen = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName: string, params?: object) => {
        if (screenName === 'back') {
            navigation.goBack()
        } else {
            navigation.navigate(screenName, params);
        }

    };

    return { navigateToScreen };
};

