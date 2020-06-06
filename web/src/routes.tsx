import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home'; //não precisa colocar o index porque ele sempre tenta procurar um index dentro da pasta
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    //O exact serve para que aquela rota só seja usada se for exatamente igual o que está, ou seja quando o site não estiver em nenhum página interna
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path='/create-point' />
        </BrowserRouter>
    )
}

export default Routes;