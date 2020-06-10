import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => {
    //NavigationContainer precisa estar por volta de todas as rotas da aplicação, define como as rotas devem se comportar, assim como o BrowserRouter na web
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode='none'
                screenOptions={{
                    cardStyle: { backgroundColor: '#f0f0f5', } //estilo aqui se aplica a todas as páginas
                }}
            >
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Points' component={Points} />
                <AppStack.Screen name='Detail' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;