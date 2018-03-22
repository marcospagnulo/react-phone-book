import React from 'react';
import Calendar from '../components/calendar/calendar';

const Home = () => (
    <div className="row">
        <div className="w-100 p-3">
            {/* message list */}
            <div className="card">
                <div className="card-header">
                    <h4>Calendar</h4>
                </div>
                <div className="card-body">
                    <Calendar />
                </div>
            </div>
        </div>
    </div>
);

export default Home;