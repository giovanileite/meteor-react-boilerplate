import React, { Component } from 'react'

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <PrivateHeader title="Dashboard"/>
                <div className="page-content">
                    <NoteList />
                    <Editor/>
                </div>
            </div>
        )
    }
}



// export default () => {
//     return (
//         <div>
//             <PrivateHeader title="Dashboard"/>
//             <div className="page-content">
//                 Dashboard page content
//             </div>
//         </div>
//     )
// }
