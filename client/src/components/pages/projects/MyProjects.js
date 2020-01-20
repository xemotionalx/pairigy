import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectsByOwnerId, getProjectById } from "../../../actions/project";
import DefaultAvatar from "../../../images/default-profile-avatar.jpg";

function MyProjects({
  getProjectsByOwnerId,
  getProjectById,
  auth: { user },
  project: { projects, loading }
}) {

  useEffect(() => {
    getProjectsByOwnerId();
  }, [getProjectsByOwnerId]);

  const setProjectState = async e => {
    e.preventDefault();
    const { dataset: {projectid} } = e.target;
    await getProjectById(projectid);
    window.location.replace(`project/edit/${projectid}`);
  };

  return loading && projects === [] ? (
    <div>loading</div>
  ) : (
    <div className="container mt-5 mb-5">
      <h1>{user && user.name}, Edit And Manage The Projects You Own</h1>
      {projects.map((project, index) => (
        <div className="project-box row mt-5" key={index}>
          <div className="col-sm-12">
            <div className="project-box--header row">
              <div className="col-sm-12">
                <button
                  className="button button--user-action float-right" 
                  data-projectid={project._id}
                  onClick={(e) => setProjectState(e)}
                >
                  Edit Project
                </button>
                <h3 className="heading-project--main ml-1 mt-2">
                  {project.name}
                </h3>
                <div className="project-tag--box">{project.website}</div>
                <p>
                  <b>Description: </b>
                  {project.description}
                </p>
              </div>
            </div>
            <div className="project-box--body row">
              <div className="col-sm-12">
                <h3 className="heading-project--sub">Team</h3>
                <div className="row">
                  {project.team.map((role, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                      <div className="card__team mb-3 text-center">
                        <img
                          src={role.user ? role.user.avatar : DefaultAvatar}
                          alt="user avatar"
                          className="avatar avatar--sm w-50"
                        />
                        <hr />
                        {role.user ? (
                          <p>
                            <b>Name: </b> {role.user.name}
                          </p>
                        ) : (
                          <p>
                            <b> Position Open </b>
                          </p>
                        )}
                        <p>
                          <b>Role: </b> {role.role}{" "}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

MyProjects.propTypes = {
  getProjectsByOwnerId: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project
});

export default connect(mapStateToProps, { getProjectsByOwnerId, getProjectById })(MyProjects);
