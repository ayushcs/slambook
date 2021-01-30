import React from 'react'
import { Link } from 'react-router-dom';


class ViewSlams extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalusers : [{
                users: 'Ayush',
                form_id: 'someUniqueId',
            }, {
                users: 'Nihal',
                form_id: 'someUniqueId2',
            }],
        }
    }

    componentDidMount() {
        console.log(this.props.match);
    }

    render() { 
        return ( 
            <div className="table-responsive mt-2 p-1">
                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>S.no.</th>
                            <th>Person</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.totalusers.map ((value, index)=> {
                            return (
                                
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><Link to={this.props.match.url + "/formid=" + value.form_id}>{value.users} </Link></td>
                                </tr>
                                
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default ViewSlams;