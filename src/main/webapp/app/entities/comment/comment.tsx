import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Comment extends React.Component<ICommentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { commentList, match } = this.props;
    return (
      <div>
        <h2 id="comment-heading">
          Comments
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Comment
          </Link>
        </h2>
        <div className="table-responsive">
          {commentList && commentList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Text</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Travel</th>
                  <th>Owner</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {commentList.map((comment, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${comment.id}`} color="link" size="sm">
                        {comment.id}
                      </Button>
                    </td>
                    <td>{comment.text}</td>
                    <td>
                      <TextFormat type="date" value={comment.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={comment.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{comment.travel ? <Link to={`travel/${comment.travel.id}`}>{comment.travel.id}</Link> : ''}</td>
                    <td>{comment.owner ? <Link to={`user-extra/${comment.owner.id}`}>{comment.owner.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${comment.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${comment.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${comment.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Comments found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ comment }: IRootState) => ({
  commentList: comment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
