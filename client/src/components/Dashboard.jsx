import React from 'react';
import Feed from './Feed';

const Dashboard = () => {
    return (
        <div className="content">
            <div className="add">
                <h3>ADD</h3>
                <div className="add-options">
                    <button>Text</button>
                    <button>Image</button>
                    <button>Video</button>
                </div>
                <button>Create</button>
            </div>
            <Feed />
        </div>
    );
};

export default Dashboard;
