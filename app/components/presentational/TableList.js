import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function TableList({ type, entities, removeEntity, selectEntity }) {
  //entity being student or campus
  if (!entities.length) return null;
  return (
    <table id="all-campuses">
      <tbody>
        <tr>
          <th>id</th>
          <th>name</th>
          {headersFromEntity(entities[0]).map(header => (
            <th key={header}>{header}</th>
          ))}
          <th>view</th>
          <th>delete</th>
        </tr>
        {entities.map(entity => {
          return (
            <tr key={entity.id}>
              <td>{entity.id}</td>
              <td>{entity.name}</td>
              {headersFromEntity(entity).map(header => {
                switch (header) {
                  case 'students':
                    return <td key={header}>{entity[header].length}</td>;
                  case 'campus':
                    return <td key={header}>{entity[header].name}</td>;
                  default:
                    return <td key={header}>{entity[header]}</td>;
                }
              })}
              <td>
                <NavLink to={`/${type}/${entity.id}`}>
                  <i
                    onClick={() => selectEntity(entity)}
                    className="em em-mag"
                  />
                </NavLink>
              </td>
              <td>
                <i
                  className="em em-x"
                  onClick={evt => {
                    evt.preventDefault();
                    confirm('Are you sure?') && removeEntity(entity.id);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function headersFromEntity(entity) {
  return Object.keys(entity).filter(
    key =>
      [
        'createdAt',
        'updatedAt',
        'image',
        'address',
        'email',
        'name',
        'id',
        'campusId'
      ].indexOf(key) === -1
  );
}

export default withRouter(TableList);
