import React, { Component } from "react";

import { connect } from "react-redux";
import { fetchTeamPlayers } from "../../../../actions/soccerTeamsActions";

import PlayerThumbnail from "./PlayerThumbnail";

//import SoccerTeamCard from "./SoccerTeamCard";

import "../../../../styles/SoccerTeam.css";

class SoccerTeamShow extends Component {
  state = {
    players: {}
  };

  findTeam = id => {
    return this.props.teams.find(team => {
      return team.id === id;
    });
  };

  mapPlayersToPlayerThumb = () => {
    return this.state.players.map(player => {
      return <PlayerThumbnail key={player.id} player={player} />;
    });
  };

  componentDidMount() {
    let teamId = this.props.match.params.id;
    console.log("ID", teamId);
    fetchTeamPlayers(teamId).then(players => {
      //console.log(players);
      this.setState({ players: players["data"] });
    });
  }

  render() {
    let teamId = this.props.match.params.id;
    let team = this.findTeam(teamId);
    console.log(this.state.players);
    if (team === undefined) {
      return (
        <div className="soccerTeamContainer">
          <div className="soccerTeamWait">
            <img
              src="https://media.giphy.com/media/qBYY1bBX10Y6I/giphy.gif"
              alt="loading spinner"
            />
          </div>
        </div>
      );
    } else {
      console.log(team.attributes);
      return (
        <div className="soccerTeamContainer">
          <div className="soccerTeamDetails">
            <img src={team.attributes.team_logo} alt="team logo" />
            <h1>{team.attributes.name}</h1>
            <h3>{team.attributes.stadium_location}</h3>
            <h3>
              {team.attributes.manager && `Manager: ${team.attributes.manager}`}
            </h3>

            <p>{team.attributes.description}</p>
          </div>
          {/* TODO: REFACTOR TEAM DETAILS INTO OWN COMPONENT HERE?*/}

          {/*<hr />*/}

          <div className="teamShowPlayers">
            <h2>{team.attributes.name} Players:</h2>
            {this.mapPlayersToPlayerThumb()}
          </div>

          <div className="teamShowStadium">
            <h2>{team.attributes.home_stadium}</h2>
            {/* TODO: ADD STADIUM DEETS HERE*/}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams
  };
};

export default connect(mapStateToProps)(SoccerTeamShow);

// TEAM attributes:
// altName
// description
// facebook
// founded
// home_stadium
// instagram
// league
// manager
// name
// stadium_capacity
// stadium_description
// stadium_location
// stadium_thumbnail
// team_jersey
// team_logo
// twitter
// website
