import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

//this takes a list of students or campuses and creates a table with headers and rows based on the given entities keys.
function TableList({ type, entities, removeEntity, selectEntity }) {
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
              {/*It's about here that I realized this wasn't the best idea, who needs "entities" anyway?*/}
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
                  className="em em-heavy_multiplication_x"
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

//remove unwanted headers for iteration through keys
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
