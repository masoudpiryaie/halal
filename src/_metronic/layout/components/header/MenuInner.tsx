import React, {useEffect, useState} from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'
import {selectClaims} from 'app/modules/auth/redux/AuthSlice'
import {useAppSelector} from 'setup/redux/hooks'

export function MenuInner() {
  const [userMenu, setuserMenu] = useState(false)
  const [roleMenu, setroleMenu] = useState(false)
  const [countryMenu, setcountryMenu] = useState(false)
  const [activitiesMenu, setactivitiesMenu] = useState(false)
  const [addressTypeMenu, setaddressTypeMenu] = useState(false)
  const [companyTypeMenu, setcompanyTypeMenu] = useState(false)
  const [agentTypesMenu, setagentTypesMenu] = useState(false)
  const [fieldsMenu, setfieldsMenu] = useState(false)
  const [agentsMenu, setagentsMenu] = useState(false)
  const [ServicesMenu, setaServicesMenu] = useState(false)
  const [StructureMenu, setStructureMenu] = useState(false)
  const [PayeInfoMenu, setPayeInfoMenu] = useState(false)
  const [ServiceCodeRequestMenu, setServiceCodeRequestMenu] = useState(false)
  const [IranCodeStructureMenu, setIranCodeStructureMenu] = useState(false)
  const [GPCStructureMenu, setGPCStructureMenu] = useState(false)
  const [ShenaseStructureMenu, setShenaseStructureMenu] = useState(false)
  const [GTINCodeRequestMenu, setGTINCodeRequestMenu] = useState(false)
  const [TanazorMenu, setTanazorMenu] = useState(false)
  const [Tanazor1Menu, setTanazor1Menu] = useState(false)
  const [PackagingMenu, setPackagingMenu] = useState(false)
  const [EntityFilesMenu, setEntityFilesMenu] = useState(false)
  const [FileTypesMenu, setFileTypesMenu] = useState(false)
  const [ServiceStructureMenu, setServiceStructureMenu] = useState(false)
  const claims = useAppSelector(selectClaims)
  useEffect(() => {
    debugger
    if ('Full' && claims && claims.indexOf('Full') === -1) {
      setuserMenu(true)
      setroleMenu(true)
      setcountryMenu(true)
      setactivitiesMenu(true)
      setaddressTypeMenu(true)
      setcompanyTypeMenu(true)
      setagentTypesMenu(true)
      setfieldsMenu(true)
      setagentsMenu(true)
      setaServicesMenu(true)
      setStructureMenu(true)
      setPayeInfoMenu(true)
      setServiceCodeRequestMenu(true)
      setIranCodeStructureMenu(true)
      setGPCStructureMenu(true)
      setShenaseStructureMenu(true)
      setGTINCodeRequestMenu(true)
      setTanazorMenu(true)
      setTanazor1Menu(true)
      setPackagingMenu(true)
      setEntityFilesMenu(true)
      setFileTypesMenu(true)
      setServiceStructureMenu(true)
    } else {
      var claimUsers = 'AuthService.Users.Full'
      if (claimUsers && claims && claims.indexOf(claimUsers) === -1) setuserMenu(true)
      else setuserMenu(false)
      var claimRoles = 'AuthService.Roles.Full'
      if (claimRoles && claims && claims.indexOf(claimRoles) === -1) setroleMenu(true)
      else setroleMenu(false)
      var claimCountry = 'AuthService.Country.Full'
      if (claimCountry && claims && claims.indexOf(claimCountry) === -1) setcountryMenu(true)
      else setcountryMenu(false)
      var claimActivities = 'AuthService.Activities.Full'
      if (claimActivities && claims && claims.indexOf(claimActivities) === -1)
        setactivitiesMenu(true)
      else setactivitiesMenu(false)
      var claimAddressType = 'AuthService.AddressType.Full'
      if (claimAddressType && claims && claims.indexOf(claimAddressType) === -1)
        setaddressTypeMenu(true)
      else setaddressTypeMenu(false)
      var claimCompanyType = 'AuthService.CompanyType.Full'
      if (claimCompanyType && claims && claims.indexOf(claimCompanyType) === -1)
        setcompanyTypeMenu(true)
      else setcompanyTypeMenu(false)
      var claimAgentTypes = 'AuthService.AgentTypes.Full'
      if (claimAgentTypes && claims && claims.indexOf(claimAgentTypes) === -1)
        setagentTypesMenu(true)
      else setagentTypesMenu(false)
      var claimFields = 'AuthService.Fields.Full'
      if (claimFields && claims && claims.indexOf(claimFields) === -1) setfieldsMenu(true)
      else setfieldsMenu(false)
      var claimagents = 'AuthService.Agents.Full'
      if (claimagents && claims && claims.indexOf(claimagents) === -1) setagentsMenu(true)
      else setagentsMenu(false)
      var claimServices = 'AuthService.Services.Services'
      if (claimServices && claims && claims.indexOf(claimServices) === -1) setaServicesMenu(true)
      else setaServicesMenu(false)
      var claimStructure = 'AuthService.Structure.Full'
      if (claimStructure && claims && claims.indexOf(claimStructure) === -1) setStructureMenu(true)
      else setStructureMenu(false)
      var claimPayeInfo = 'AuthService.PayeInfo.Full'
      if (claimPayeInfo && claims && claims.indexOf(claimPayeInfo) === -1) setPayeInfoMenu(true)
      else setPayeInfoMenu(false)
      var claimServiceCodeRequest = 'AuthService.ServiceCodeRequest.Full'
      if (claimServiceCodeRequest && claims && claims.indexOf(claimServiceCodeRequest) === -1)
        setServiceCodeRequestMenu(true)
      else setServiceCodeRequestMenu(false)
      var claimIranCodeStructure = 'AuthService.IranCodeStructure.Full'
      if (claimIranCodeStructure && claims && claims.indexOf(claimIranCodeStructure) === -1)
        setIranCodeStructureMenu(true)
      else setIranCodeStructureMenu(false)
      var claimGPCStructure = 'AuthService.GPCStructure.Full'
      if (claimGPCStructure && claims && claims.indexOf(claimGPCStructure) === -1)
        setGPCStructureMenu(true)
      else setGPCStructureMenu(false)
      var claimShenaseStructure = 'AuthService.ShenaseStructure.Full'
      if (claimShenaseStructure && claims && claims.indexOf(claimShenaseStructure) === -1)
        setShenaseStructureMenu(true)
      else setShenaseStructureMenu(false)
      var claimGTINCodeRequest = 'AuthService.GTINCodeRequest.Full'
      if (claimShenaseStructure && claims && claims.indexOf(claimGTINCodeRequest) === -1)
        setGTINCodeRequestMenu(true)
      else setGTINCodeRequestMenu(false)
      var claimTanazor = 'AuthService.Tanazor.Full'
      if (claimTanazor && claims && claims.indexOf(claimTanazor) === -1) setTanazorMenu(true)
      else setTanazorMenu(false)
      var claimTanazor1 = 'AuthService.Tanazor1.Full'
      if (claimTanazor1 && claims && claims.indexOf(claimTanazor1) === -1) setTanazor1Menu(true)
      else setTanazor1Menu(false)
      var claimPackaging = 'AuthService.Packaging.Full'
      if (claimPackaging && claims && claims.indexOf(claimPackaging) === -1) setPackagingMenu(true)
      else setPackagingMenu(false)
      var claimFileTypes = 'AuthService.FileTypes.Full'
      if (claimFileTypes && claims && claims.indexOf(claimFileTypes) === -1) setFileTypesMenu(true)
      else setFileTypesMenu(false)
      var claimEntityFiles = 'AuthService.EntityFiles.Full'
      if (claimEntityFiles && claims && claims.indexOf(claimEntityFiles) === -1)
        setEntityFilesMenu(true)
      else setEntityFilesMenu(false)
      var claimServiceStructure = 'AuthService.ServiceStructure.Full'
      if (claimServiceStructure && claims && claims.indexOf(claimServiceStructure) === -1)
        setServiceStructureMenu(true)
      else setServiceStructureMenu(false)
    }
  }, [])
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuInnerWithSub
        to='/base-info/'
        title='اطلاعات پایه سیستم'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UsersController'})}
            to='/admin/base-info/users'
          />
        )}
        {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.RequestStatusesController'})}
            to='/admin/base-info/RequestStatuses'
          />
        )}
        {true && (
          <MenuItem title={intl.formatMessage({id: 'MENU.Identity.RolesController'})} to='/role' />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.CountryController'})}
            to='/admin/base-info/country'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityFieldController'})}
            to='/admin/base-info/MembershipActivityField'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityTypeController'})}
            to='/admin/base-info/MembershipActivityType'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipAddressTypeController'})}
            to='/admin/base-info/MembershipAddressType'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipAgentTypeController'})}
            to='/admin/base-info/MembershipAgentType'
          />
        )}

        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipCompanyTypeController'})}
            to='/admin/base-info/MembershipCompanyType'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UnitOfMeasurementsController'})}
            to='/admin/base-info/UnitOfMeasurements'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UnitOfWeightsController'})}
            to='/admin/base-info/UnitOfWeights'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgreementsController'})}
            to='/admin/base-info/agreements'
          />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='نماینده'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgentsController'})}
            to='/admin/base-info/agents'
          />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='اعضا'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberController'})}
            to='/admin/base-info/members'
          />
        )}
        {/* {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberFactorController'})}
            to='/admin/base-info/memberFactor'
          />
        )} */}
        {true && ( //agentsMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PreInvoicesListController'})}
            to='/admin/base-info/preInvoicesList'
          />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='ایران کد'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.IranCodeStructureController'})}
            to='/admin/base-info/iranCodeStructure'
          />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='خدمات'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //ServiceStructure
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceStructureController'})}
            to='/admin/base-info/serviceStructure'
          />
        )}
        {true && ( //PayeInfoMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayeInfoController'})}
            to='/admin/base-info/payeInfo'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeListController'})}
            to='/admin/base-info/serviceCodeList'
          />
        )}
      </MenuInnerWithSub>

      {/* <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.User'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {userMenu && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UsersController'})}
            to='/admin/base-info/users'
          />
        )}
        {roleMenu && (
          <MenuItem title={intl.formatMessage({id: 'MENU.Identity.RolesController'})} to='/role' />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.BaseInfo'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.CountryController'})}
            to='/admin/base-info/country'
          />
        )}
   
     

        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AddressTypeController'})}
            to='/admin/base-info/addressType'
          />
        )}

      
      
        
      
      
     
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title={'عضویت'}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityFieldController'})}
            to='/admin/base-info/MembershipActivityField'
          />
        )}
        
      
       
       
      </MenuInnerWithSub> */}
      <MenuInnerWithSub
        to='/base-info/'
        title={'مدیریت مالی'}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PackagesController'})}
            to='/admin/base-info/Packages'
          />
        )}
        {/* {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.SubscriptionsController'})}
            to='/admin/base-info/Subscriptions'
          />
        )} */}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ProductsController'})}
            to='/admin/base-info/Products'
          />
        )}

        {true && ( //ServiceCodeRequestMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShowServiceCodeController'})}
            to='/admin/base-info/showServiceCode'
          />
        )}

        {/* {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShenaseStructureController'})}
            to='/admin/base-info/shenaseStructure'
          />
        )} */}
        {/* {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayGatesController'})}
            to='/admin/base-info/PayGates'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PaymentsController'})}
            to='/admin/base-info/Payments'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TariffsController'})}
            to='/admin/base-info/Tariffs'
          />
        )} */}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='گزارشات'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //ServiceStructure
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberListController'})}
            to='/admin/base-info/memberList'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeListController'})}
            to='/admin/base-info/serviceCodeList'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GLNListController'})}
            to='/admin/base-info/gLNList'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINListController'})}
            to='/admin/base-info/gTINList'
          />
        )}
      </MenuInnerWithSub>
      <MenuInnerWithSub
        to='/base-info/'
        title='سایر'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FileTypeController'})}
            to='/admin/base-info/fileTypes'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.EntityFileController'})}
            to='/admin/base-info/entityFiles'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PackagingController'})}
            to='/admin/base-info/packaging'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PureContentUnitsController'})}
            to='/admin/base-info/PureContentUnits'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.OriginCountrysController'})}
            to='/admin/base-info/OriginCountrys'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TargetMarketsController'})}
            to='/admin/base-info/TargetMarkets'
          />
        )}

        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.LanguagesController'})}
            to='/admin/base-info/Languages'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ContactInfoController'})}
            to='/admin/base-info/ContactInfo'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.SubscriptionsController'})}
            to='/admin/base-info/Subscriptions'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShenaseStructureController'})}
            to='/admin/base-info/shenaseStructure'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayGatesController'})}
            to='/admin/base-info/PayGates'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PaymentsController'})}
            to='/admin/base-info/Payments'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TariffsController'})}
            to='/admin/base-info/Tariffs'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeRequestController'})}
            to='/admin/base-info/serviceCodeRequest'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GPCStructureController'})}
            to='/admin/base-info/gPCStructure'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINCodeRequestController'})}
            to='/admin/base-info/gTINCodeRequest'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TanazorController'})}
            to='/admin/base-info/tanazor'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.Tanazor1Controller'})}
            to='/admin/base-info/tanazor1'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.GLNManagment.GLNCodeRequestController'})}
            to='/admin/base-info/gLNCodeRequest'
          />
        )}
        {companyTypeMenu && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.CompanyTypeController'})}
            to='/admin/base-info/companyType'
          />
        )}
        {agentTypesMenu && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgentTypesController'})}
            to='/admin/base-info/agentTypes'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ActivitiesController'})}
            to='/admin/base-info/activities'
          />
        )}
        {true && (
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FieldsController'})}
            to='/admin/base-info/fields'
          />
        )}
      </MenuInnerWithSub>
      {/* <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.Services'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //ServiceStructure
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceStructureController'})}
            to='/admin/base-info/serviceStructure'
          />
        )}

        {true && ( //ServiceCodeRequestMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeRequestController'})}
            to='/admin/base-info/serviceCodeRequest'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShowServiceCodeController'})}
            to='/admin/base-info/showServiceCode'
          />
        )}
      </MenuInnerWithSub> */}
      {/* <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.GTINManagment'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
      
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GPCStructureController'})}
            to='/admin/base-info/gPCStructure'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShenaseStructureController'})}
            to='/admin/base-info/shenaseStructure'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINCodeRequestController'})}
            to='/admin/base-info/gTINCodeRequest'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TanazorController'})}
            to='/admin/base-info/tanazor'
          />
        )}
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.Tanazor1Controller'})}
            to='/admin/base-info/tanazor1'
          />
        )}
      </MenuInnerWithSub> */}
      {/* <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.GLNManagment'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        {true && ( //StructureMenu
          <MenuItem
            title={intl.formatMessage({id: 'MENU.GLNManagment.GLNCodeRequestController'})}
            to='/admin/base-info/gLNCodeRequest'
          />
        )}
      </MenuInnerWithSub> */}
      {/* {companyTypeMenu && (
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.CompanyTypeController'})}
          to='/admin/base-info/companyType'
        />
      )}
      {agentTypesMenu && (
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.AgentTypesController'})}
          to='/admin/base-info/agentTypes'
        />
      )}
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.AdsTypeController'})}
        to='/admin/base-info/ads-type'
      />

      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.BankController'})}
        to='/admin/base-info/bank'
      />

      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.BaseNamesController'})}
        to='/admin/base-info/baseNames'
      />

      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.WorthsController'})}
        to='/admin/base-info/worths'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.UnitsController'})}
        to='/admin/base-info/units'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.PropertiesController'})}
        to='/admin/base-info/properties'
      />

      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.CountryPortController'})}
        to='/admin/base-info/countryPort'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.PackageTypeController'})}
        to='/admin/base-info/packageType'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.ProductGroupController'})}
        to='/admin/base-info/productGroup'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.CompanyController'})}
        to='/admin/base-info/company'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.EducationController'})}
        to='/admin/base-info/education'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.ProvinceController'})}
        to='/admin/base-info/province'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.CityController'})}
        to='/admin/base-info/city'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.ShipmentController'})}
        to='/admin/base-info/shipment'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.ViolationTitleController'})}
        to='/admin/base-info/violationTitle'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.ProductTypeController'})}
        to='/admin/base-info/productType'
      />
      <MenuInnerWithSub
        to='/base-info/'
        title='dddddd'
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.BankController'})}
          to='/admin/base-info/bank'
        />
      </MenuInnerWithSub>
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.CustomerAttractionTypeController'})}
        to='/admin/base-info/customer-attraction-type'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.CustomerCategoryController'})}
        to='/admin/base-info/customer-category'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.PublisherTypeController'})}
        to='/admin/base-info/publisher-type'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.PublisherCategoryController'})}
        to='/admin/base-info/publisher-category'
      />
      <MenuItem
        title={intl.formatMessage({id: 'MENU.BaseInfo.PricePackageController'})}
        to='/admin/base-info/price-package'
      />
      {true && ( //StructureMenu
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.StructureController'})}
          to='/admin/base-info/structure'
        />
      )}
      {true && ( //PayeInfoMenu
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.PayeInfoController'})}
          to='/admin/base-info/payeInfo'
        />
      )}
      {ServicesMenu && (
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.ServicesController'})}
          to='/admin/base-info/services'
        />
      )}
      <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.HalalCenter'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.EmbarkController'})}
          to='/admin/base-info/embark'
        />
      </MenuInnerWithSub> */}
      {/* <MenuInnerWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.Observer'})}
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.ObserverController'})}
          to='/admin/base-info/observer'
        />
      </MenuInnerWithSub> */}
      {/* <MenuInnerWithSub
        to='/base-info/'
        title='گزارش'
        icon='/media/icons/duotune/abstract/abs024.svg'
        hasArrow={true}
        menuPlacement='bottom-start'
        menuTrigger={`{default:'click', lg: 'hover'}`}
      >
        <MenuItem
          title={intl.formatMessage({id: 'MENU.BaseInfo.ObserverController'})}
          to='/admin/base-info/Report/EmbarkProductQtyAll'
        />
        <MenuItem title='Brand' to='/admin/base-info/Brand' />
      </MenuInnerWithSub> */}
    </>
  )
}
