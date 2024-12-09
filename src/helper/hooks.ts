import { useNavigation } from '@react-navigation/native';

export const useNavigateToScreen = () => {
    const navigation = useNavigation();

    const navigateToScreen = (screenName: string, params?: object) => {
        navigation.navigate(screenName, params);
    };

    return { navigateToScreen };
};

