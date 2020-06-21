import React from 'react';
import './Landing.scss';
import Navbar from '../../shared/Nav/';
import { Button } from 'react-bootstrap';
import { NavLink as Link } from 'react-router-dom';
import Footer from '../../shared/Footer';
import { useTranslation } from 'react-i18next';
const Landing = (props) => {

  const { t } = useTranslation();
  return (
    <div>
      <div className="landing">
        <Navbar />
        <div className="Landing__banner">
          <div className="Landing__content">
            <p>{t('Landing.1')}</p>
            <h1 classNate="Landing__banner__heading">{t('Landing.2')}</h1>
            <p>{t('Landing.3')}</p>
            <Link to="/survey">
              <Button variant="info" link={true} target="_blank">{t('Landing.4')}!</Button>
            </Link>
          </div>
        </div>

      </div>


      <div class="b" >
        <div class="a">
        </div>
        <div>
          <h2>{t('Landing.5')}</h2>
          <p>
            {t('Landing.6')}.<br />
            {t('Landing.7')}!
          </p>
          <Button href="https://www.who.int/health-topics/coronavirus" variant="info" target="_blank">{t('Landing.8')}</Button>
        </div>
        <div>
          <h2>{t('Landing.9')}</h2>
          <p>{t('Landing.10')} <br />{t('Landing.11')}</p>
          <Button href="https://www.who.int/health-topics/coronavirus" variant="info" target="_blank">{t('Landing.12')}</Button>
        </div>
        <div class="c"></div>
      </div>
      <Footer />
    </div>
  )
};
export default Landing;
