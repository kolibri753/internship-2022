<?php

namespace Vahov\SystemConfigurationsSocials\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Store\Model\ScopeInterface;

class Data extends AbstractHelper
{

  // $this->scopeConfig->getValue('socials/system/linkedin', \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

  public function getConfig($config_path)
  {
    return $this->scopeConfig->getValue(
      $config_path,
      \Magento\Store\Model\ScopeInterface::SCOPE_STORE
    );
  }

  const XML_PATH_SOCIALS_LIST = 'socials_list/';

  public function getConfigValue($field, $storeCode = null)
  {
    return $this->scopeConfig->getValue($field, ScopeInterface::SCOPE_STORE, $storeCode);
  }

  public function getSystemConfig($fieldId, $storeCode = null)
  {
    return $this->getConfigValue(self::XML_PATH_SOCIALS_LIST . 'system/' . $fieldId, $storeCode);
  }
}
