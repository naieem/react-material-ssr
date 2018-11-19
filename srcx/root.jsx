import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Header from './Header/index';
import NotFound from './notFound/index';
import {Switch} from 'react-router';
import * as routes from './routes';
const drawerWidth = 240;

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        paddingLeft: drawerWidth + 30,
        paddingTop: 90
    }
});

class Root extends Component {
    constructor(props) {
        super(props);
        this.menu = routes.default;
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header></Header>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        {this.menu.map((text, index) => (
                            <Route exact path={text.route} component={text.componenet}/>
                        ))}
                        <Route path="*" component={NotFound}/>
                        {/* <Route exact path="/" component={App}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path={`/topics`} component={Topic}/>
                        <Route path="*" component={NotFound}/> */}
                    </Switch>
                </main>
            </div>
        );
    }
}
Root.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Root);