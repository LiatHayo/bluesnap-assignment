import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import classes from './Movie.module.css';

const Relation = (props) => {

    const [relation, setRelation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const fetchMoviesRelationHandler = async (relationUrls, setRelationName) => {
      setIsLoading(true);
      try {
        const response = await Promise.all(relationUrls.map((url) => {
          return fetch(url);
        }));
        const data = await Promise.all(response.map((item) => {
          return item.json();
        }));
        setRelationName(data.map(relation => relation.name));
      }catch(err){
        // TODO: show error
      }
      setIsLoading(false);
    }

    return(
        <div style={{textAlign: "left"}} onClick={async () => {if(relation.length === 0) await fetchMoviesRelationHandler(props.relationUrls, setRelation)}}>
            <Collapsible className={classes.relationTitle} trigger={props.relationTitle}>
            {isLoading && <p>Loading...</p>}
            <ul>
                {relation.map((relationData, index) => (
                <li className={classes.content} key={index}>{relationData}</li>
                ))}
            </ul>
            </Collapsible>
      </div>
    );

}

export default Relation;