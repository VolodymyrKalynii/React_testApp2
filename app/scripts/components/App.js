import * as React from 'react';

import TaskLIst from '../containers/TaskLIst';
import TasksControls from '../containers/TasksControls';

export default class App extends React.Component{
    render() {
        return (
            <div className='taskWrapper'>
                <TasksControls/>
                <TaskLIst/>
            </div>
        );
    }
}
