import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../home/Home';
import Cardapio from '../criarCardapio/Cardapio';
import Salgados from '../salgados/Salgados';
import Sorvetes from '../sorvetes/Sorvetes';
import Caldos from '../caldos/Caldos';

export default props => 
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/cardapios" component={Cardapio} />
        <Route path="/salgados" component={Salgados} />
        <Route path="/sorvetes" component={Sorvetes} />
        <Route path="/caldos" component={Caldos} />
        <Redirect from="*" to="/" /> {/* Qualquer coisa vai ser redirecionado pro '/' */}
    </Switch>