import React from 'react' 
import { connect } from 'react-redux' 

import myTheme, { customStyles } from "./../theme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Layout from './../../components/Layout'

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/content/forward';
import { getQuizByID, getCat, getMeta } from './../actionCreators'

class Categoties extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            cats: null
        }
        
    }
    get getHost(){
        return window.location.origin
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(myTheme) }
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    componentWillMount() {
        let { getCat } = this.props;
        getCat();
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        // potential place to filter 
        this.state.cats = nextProps.cats
    }

    render(){
        let color = this.getRandomColor();

        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto',
            },
        };
        return(
            
            <Layout >
              <div className={"quiz-container"}>    
                <div style={{background: color}}>{color}</div>
                {
                    (this.state.cats)
                        ?
                            <div style={styles.root}>
                                <GridList
                                cols={2}
                                cellHeight={200}
                                padding={1}
                                style={styles.gridList}
                                >
                                {Object.values(this.state.cats).map((tile) => (
                                    <GridTile
                                    key={this.getHost + '/' +tile.scrImg}
                                    title={tile.title}
                                    subtitle={<span>Quantity: <b>{tile.quantity}</b></span>}
                                    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                                    actionPosition="right"
                                    titlePosition="top"
                                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                    cols={tile.featured ? 2 : 1}
                                    rows={tile.featured ? 2 : 1}
                                    >
                                    <img src={this.getHost + '/' +tile.scrImg} />
                                    </GridTile>
                                ))}
                                </GridList>
                            </div>
                        :
                        <div className="preloading__cart">
                            <p>Quiz Is Loading!!!</p>
                            <p>Pick That You Like More</p>
                        </div>
                }
              </div>  
            </Layout>
            )
    }



}

Categoties.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};  

export default 
connect(
state => ({cats: state.cat}),
  {getQuizByID, getMeta, getCat}
)(Categoties)   