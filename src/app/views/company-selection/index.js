import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import imgWimDental from "../../images/wimdental-logo.png";

export default function CompanySelection(props) {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (
      !!localStorage.getItem("@token") &&
      !!localStorage.getItem("@company")
    ) {
      props.history.push("/access-list");
    }
    if (!localStorage.getItem("@token")) {
      props.history.push("/");
    }
  }, [company]);

  function setLocalStorageCompany(value) {
    localStorage.setItem("@company", value);
    setCompany(value);
  }

  return (
    <div className="bg">
    <br/><br/>
    <h1 className="title-select-wim">Selecione o WIM que deseja administrar</h1>
      <Row className="company-list">
        <Col span={12} offset={9}>
          <Row gutter={12}>
            <Col span={12}>
              <Card className="card-select-wim" onClick={() => setLocalStorageCompany("wim-dental")}>
                <img width="100%" alt="Wim Dental" src={imgWimDental} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
