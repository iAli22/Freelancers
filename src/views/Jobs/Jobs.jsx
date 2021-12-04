import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  CardsSkeleton,
  HeaderBreadcrumb,
  JobClientInfo,
  JobDetails,
} from "../../components";
import { Layout } from "../../Containers";
import { errorToast } from "../../helper/toastMessage";
import { jobDetails } from "../../redux/actions/userAction";

function Jobs() {
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    dispatch(jobDetails(id))
      .then((res) => {
        setJob(res.data.data.job);
      })
      .catch((err) => {
        errorToast(err.message);
      });
  }, [dispatch, id]);
  return (
    <Layout>
      <Container>
        <HeaderBreadcrumb
          mainSection="الرئيسية"
          subSection="تفاصيل الوظيفة"
          activeSection="مشاريع تجربة المستخدم"
        />
        <Row>
          <Col lg={3}>
            <h5>المشاريع</h5>

            {job && <JobClientInfo client={job.posted_by} />}
            {!job && (
              <div>
                <CardsSkeleton height={400} />
              </div>
            )}
          </Col>
          <Col lg={9}>
            {job && <JobDetails job={job} />}
            {!job && (
              <div
                style={{
                  marginTop: "60px",
                }}
              >
                <CardsSkeleton height={"100vh"} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Jobs;
