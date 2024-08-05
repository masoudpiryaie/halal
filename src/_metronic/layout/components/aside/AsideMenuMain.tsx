/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import {useEffect, useState} from 'react'
import {useAppSelector} from 'setup/redux/hooks'
import {selectClaims} from 'app/modules/auth/redux/AuthSlice'

export function AsideMenuMain() {
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
      if (claimGTINCodeRequest && claims && claims.indexOf(claimGTINCodeRequest) === -1)
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
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='تنظیمات'
        fontIcon='bi-layers'
      />
      {/* <AsideMenuItemWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.User'})}
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        {userMenu && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UsersController'})}
            to='/admin/base-info/users'
            hasBullet={true}
          />
        )}
        {roleMenu && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.Identity.RolesController'})}
            to='/role'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.BaseInfo'})}
        icon='/media/icons/duotune/communication/com007.svg'
        fontIcon='bi-person'
      >
       
     
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ActivitiesController'})}
            to='/admin/base-info/activities'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AddressTypeController'})}
            to='/admin/base-info/addressType'
            hasBullet={true}
          />
        )}

  
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FieldsController'})}
            to='/admin/base-info/fields'
            hasBullet={true}
          />
        )}

        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.EntityFileController'})}
            to='/admin/base-info/entityFiles'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FileTypeController'})}
            to='/admin/base-info/fileTypes'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PackagingController'})}
            to='/admin/base-info/packaging'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PureContentUnitsController'})}
            to='/admin/base-info/PureContentUnits'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.OriginCountrysController'})}
            to='/admin/base-info/OriginCountrys'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TargetMarketsController'})}
            to='/admin/base-info/TargetMarkets'
            hasBullet={true}
          />
        )}
       

        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.LanguagesController'})}
            to='/admin/base-info/Languages'
            hasBullet={true}
          />
        )}
     
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'عضویت'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityFieldController'})}
            to='/admin/base-info/MembershipActivityField'
            hasBullet={true}
          />
        )}
      
       
      
       
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ContactInfoController'})}
            to='/admin/base-info/ContactInfo'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub> */}
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'اطلاعات پایه سیستم'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.RequestStatusesController'})}
            to='/admin/base-info/RequestStatuses'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UsersController'})}
            to='/admin/base-info/users'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.Identity.RolesController'})}
            to='/role'
            hasBullet={true}
            //  claim='Identity.RolesController::GetListAsync'
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.CountryController'})}
            to='/admin/base-info/country'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityFieldController'})}
            to='/admin/base-info/MembershipActivityField'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipActivityTypeController'})}
            to='/admin/base-info/MembershipActivityType'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipAddressTypeController'})}
            to='/admin/base-info/MembershipAddressType'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipAgentTypeController'})}
            to='/admin/base-info/MembershipAgentType'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MembershipCompanyTypeController'})}
            to='/admin/base-info/MembershipCompanyType'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UnitOfMeasurementsController'})}
            to='/admin/base-info/UnitOfMeasurements'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.UnitOfWeightsController'})}
            to='/admin/base-info/UnitOfWeights'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgreementsController'})}
            to='/admin/base-info/agreements'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'نماینده'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgentsController'})}
            to='/admin/base-info/agents'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'اعضا'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberController'})}
            to='/admin/base-info/member'
            hasBullet={true}
          />
        )}
        {/* {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberFactorController'})}
            to='/admin/base-info/memberFactor'
            hasBullet={true}
          />
        )} */}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PreInvoicesListController'})}
            to='/admin/base-info/preInvoicesList'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'ایران کد'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && ( //IranCodeStructureMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.IranCodeStructureController'})}
            to='/admin/base-info/iranCodeStructure'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'خدمات'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceStructureController'})}
            to='/admin/base-info/serviceStructure'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayeInfoController'})}
            to='/admin/base-info/payeInfo'
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'مالی'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PackagesController'})}
            to='/admin/base-info/Packages'
            hasBullet={true}
          />
        )}

        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ProductsController'})}
            to='/admin/base-info/Products'
            hasBullet={true}
          />
        )}

        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShowServiceCodeController'})}
            to='/admin/base-info/showServiceCode'
          />
        )}
        {/* {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.SubscriptionsController'})}
            to='/admin/base-info/Subscriptions'
            hasBullet={true}
          />
        )} */}
        {/* {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayGatesController'})}
            to='/admin/base-info/PayGates'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PaymentsController'})}
            to='/admin/base-info/Payments'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TariffsController'})}
            to='/admin/base-info/Tariffs'
            hasBullet={true}
          />
        )} */}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'گزارشات'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.MemberListController'})}
            to='/admin/base-info/memberList'
            hasBullet={true}
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeListController'})}
            to='/admin/base-info/serviceCodeList'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GLNListController'})}
            to='/admin/base-info/gLNList'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINListController'})}
            to='/admin/base-info/gTINList'
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={'سایر'}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FileTypeController'})}
            to='/admin/base-info/fileTypes'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.EntityFileController'})}
            to='/admin/base-info/entityFiles'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PackagingController'})}
            to='/admin/base-info/packaging'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PureContentUnitsController'})}
            to='/admin/base-info/PureContentUnits'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.OriginCountrysController'})}
            to='/admin/base-info/OriginCountrys'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TargetMarketsController'})}
            to='/admin/base-info/TargetMarkets'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.LanguagesController'})}
            to='/admin/base-info/Languages'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ContactInfoController'})}
            to='/admin/base-info/ContactInfo'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.SubscriptionsController'})}
            to='/admin/base-info/Subscriptions'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShenaseStructureController'})}
            to='/admin/base-info/shenaseStructure'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.PayGatesController'})}
            to='/admin/base-info/PayGates'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TariffsController'})}
            to='/admin/base-info/Tariffs'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeRequestController'})}
            to='/admin/base-info/serviceCodeRequest'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GPCStructureController'})}
            to='/admin/base-info/gPCStructure'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINCodeRequestController'})}
            to='/admin/base-info/gTINCodeRequest'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TanazorController'})}
            to='/admin/base-info/tanazor'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.Tanazor1Controller'})}
            to='/admin/base-info/tanazor1'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.GLNManagment.GLNCodeRequestController'})}
            to='/admin/base-info/gLNCodeRequest'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.CompanyTypeController'})}
            to='/admin/base-info/companyType'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.AgentTypesController'})}
            to='/admin/base-info/agentTypes'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ActivitiesController'})}
            to='/admin/base-info/activities'
            hasBullet={true}
          />
        )}
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.FieldsController'})}
            to='/admin/base-info/fields'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      {/* <AsideMenuItemWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.Services'})}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
       
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceCodeRequestController'})}
            to='/admin/base-info/serviceCodeRequest'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ServiceStructureController'})}
            to='/admin/base-info/serviceStructure'
          />
        )}
        {true && ( //ServiceCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShowServiceCodeController'})}
            to='/admin/base-info/showServiceCode'
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.GTINManagment'})}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
       
        {true && ( //GPCStructureMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GPCStructureController'})}
            to='/admin/base-info/gPCStructure'
            hasBullet={true}
          />
        )}
        {true && ( //ShenaseStructureMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.ShenaseStructureController'})}
            to='/admin/base-info/shenaseStructure'
            hasBullet={true}
          />
        )}
        {true && ( //GTINCodeRequestMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.GTINCodeRequestController'})}
            to='/admin/base-info/gTINCodeRequest'
            hasBullet={true}
          />
        )}
        {true && ( //TanazorMenu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.TanazorController'})}
            to='/admin/base-info/tanazor'
            hasBullet={true}
          />
        )}
        {true && ( //Tanazor1Menu
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.BaseInfo.Tanazor1Controller'})}
            to='/admin/base-info/tanazor1'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/base-info/'
        title={intl.formatMessage({id: 'MENU.GLNManagment'})}
        icon='/media/icons/duotune/communication/com003.svg'
        fontIcon='bi-person'
      >
        {true && (
          <AsideMenuItem
            title={intl.formatMessage({id: 'MENU.GLNManagment.GLNCodeRequestController'})}
            to='/admin/base-info/gLNCodeRequest'
            hasBullet={true}
          />
        )}
      </AsideMenuItemWithSub> */}
    </>
  )
}
