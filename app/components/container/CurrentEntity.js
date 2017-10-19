import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggleEdit } from '../../store';

function CurrentEntity(props) {
  // const selectedStudent = state.selectedStudent;
  // if (!selectedStudent) return null;
  const currEntity = props.currentEntity;
  return (
    <div id="single-campus-content">
      <div id="left-bar">
        <img src={currEntity.image} />
      </div>
      <div className="bio">
        <div className="bio-title">
          {props.edit ? (
            <input name="name" type="text" defaultValue={currEntity.name} />
          ) : (
            <span>{currEntity.name}</span>
          )}
          {props.edit ? (
            <i className="em em-floppy_disk" onClick={props.toggleEdit} />
          ) : (
            <i className="em em-pencil" onClick={props.toggleEdit} />
          )}
        </div>
        <div className="bio-info">
          {headersFromEntity(currEntity).map(header => {
            console.log(header);
            if (header === 'students') return <span key={header}>Oops</span>;
            else return (
              <div key={header}>
                <span>{header}: </span>
                {props.edit ? (
                  <input
                    name={header}
                    type="text"
                    defaultValue={currEntity[header]}
                  />
                ) : (
                  <span>{currEntity[header]}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function headersFromEntity(entity) {
  return Object.keys(entity).filter(
    key =>
      [
        'createdAt',
        'updatedAt',
        'name'
      ].indexOf(key) === -1
  );
}

function mapStateToProps(state) {
  return {
    currentEntity: state.currentEntity,
    edit: state.edit
  };
}

const mapDispatchToProps = { toggleEdit };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CurrentEntity)
);

// email:{' '}
//           {props.edit ? (
//             <input name="email" type="text" defaultValue={currEntity.email} />
//           ) : (
//             <span>{currEntity.email}</span>
//           )}
//         </div>
//         <div>
//           address:{' '}
//           {props.edit ? (
//             <input
//               name="address"
//               type="text"
//               defaultValue={currEntity.address}
//             />
//           ) : (
//             <span>{currEntity.address}</span>
//           )}
//         </div>
//         <div>
//           campusId:{' '}
//           {props.edit ? (
//             <input
//               name="address"
//               type="text"
//               defaultValue={currEntity.campusId}
//             />
//           ) : (
//             <span>{currEntity.campusId}</span>
//           )}
//         </div>
