import React from 'react';
import './Footer.scss';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
return (
    <footer class="page-footer font-small pt-4 Footer">
      {t('Footer.1')} <i className="fa fa-heart Footer__icon" aria-hidden="true"></i> {t('Footer.2')}
    </footer>
)
}

export default Footer;
