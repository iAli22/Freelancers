import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  CardsSkeleton,
  ProfileExperience,
  ProfilePortfolio,
  ProfileStatus,
  UserAvailability,
  UserDetails,
} from "../../components";
import { Layout } from "../../Containers";
import { getFreeLancer } from "../../redux/actions/commonData";
import style from "./Profile.module.scss";
function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user.profile);
  const freelancer = useSelector((state) => state.commonData.freelancer);

  useEffect(() => {
    if (profile?.user_id) {
      dispatch(getFreeLancer(profile.id));
    }
  }, [profile, dispatch]);
  return (
    <Layout>
      <section className={style.portfolioDetails}>
        <Container>
          {freelancer?.first_name && (
            <>
              <UserDetails />
              <Row>
                <Col lg={3}>
                  <UserAvailability />
                </Col>
                <Col lg={9}>
                  <ProfileStatus />
                  <ProfileExperience />
                  <ProfilePortfolio />
                </Col>
              </Row>
            </>
          )}

          {!freelancer?.first_name && (
            <>
              <CardsSkeleton
                height={130}
                style={{
                  marginBottom: "25px",
                }}
              />
              <Row>
                <Col lg={3}>
                  <CardsSkeleton height={"100vh"} />
                </Col>
                <Col lg={9}>
                  <CardsSkeleton height={"100vh"} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </Layout>
  );
}

export default Profile;
