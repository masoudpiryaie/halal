import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {RolePage} from '../pages/role/RolePage'
import {CompanyPage} from 'app/pages/admin/baseInfo/Company/CompanyPage'
import {CountryPortPage} from 'app/pages/admin/baseInfo/CountryPort/CountryPortPage'
import {BankPage} from 'app/pages/admin/baseInfo/Bank/BankPage'
import {BaseNamesPage} from 'app/pages/admin/baseInfo/BaseNames/BaseNamesPage'
import {UsersPage} from 'app/pages/admin/baseInfo/Users/UsersPage'
import {WorthsPage} from 'app/pages/admin/baseInfo/Worths/WorthsPage'
import {UnitsPage} from 'app/pages/admin/baseInfo/Units/UnitsPage'
import {PropertiesPage} from 'app/pages/admin/baseInfo/Properties/PropertiesPage'
import {BrandPage} from 'app/pages/admin/baseInfo/Brand/BrandPage'
import {ProvincePage} from 'app/pages/admin/baseInfo/Province/ProvincePage'
import {CountryPage} from 'app/pages/admin/baseInfo/Country/CountryPage'
import {CityPage} from 'app/pages/admin/baseInfo/Country/CityPage'
import {ShipmentPage} from 'app/pages/admin/baseInfo/Shipment/ShipmentPage'
import {EducationPage} from 'app/pages/admin/baseInfo/Education/EducationPage'
import {PackageTypePage} from 'app/pages/admin/baseInfo/PackageType/PackageTypePage'
import {ProductGroupPage} from 'app/pages/admin/baseInfo/ProductGroup/ProductGroupPage'
import {ViolationTitlePage} from 'app/pages/admin/baseInfo/ViolationTitle/ViolationTitlePage'
import {ProductTypePage} from 'app/pages/admin/baseInfo/ProductType/ProductTypePage'
import {EmbarkProductQtyAllPage} from 'app/pages/admin/baseInfo/Report/EmbarkProductQtyAll/EmbarkProductQtyAllPage'
import {ActivitiesPage} from 'app/pages/admin/baseInfo/Activities/ActivitiesPage'
import {AddressTypePage} from 'app/pages/admin/baseInfo/AddressType/AddressTypePage'
import {CompanyTypePage} from 'app/pages/admin/baseInfo/CompanyType/CompanyTypePage'
import {AgentTypesPage} from 'app/pages/admin/baseInfo/AgentTypes/AgentTypesPage'
import {FieldsPage} from 'app/pages/admin/baseInfo/Fields/FieldsPage'
import {AgentsPage} from 'app/pages/admin/baseInfo/Agents/AgentsPage'
import {ServicesPage} from 'app/pages/admin/baseInfo/Services/ServicesPage'
import {StructurePage} from 'app/pages/admin/baseInfo/Structure/StructurePage'
import {PayeInfoPage} from 'app/pages/admin/baseInfo/PayeInfo/PayeInfoPage'
import {ServiceCodeRequestPage} from 'app/pages/admin/baseInfo/ServiceCodeRequest/ServiceCodeRequestPage'
import {IranCodeStructurePage} from 'app/pages/admin/baseInfo/IranCodeStructure/IranCodeStructurePage'
import {GPCStructurePage} from 'app/pages/admin/baseInfo/GPCStructure/GPCStructurePage'
import {ShenaseStructurePage} from 'app/pages/admin/baseInfo/ShenaseStructure/ShenaseStructurePage'
import {GTINCodeRequestPage} from 'app/pages/admin/baseInfo/GTINCodeRequest/GTINCodeRequestPage'
import {TanazorPage} from 'app/pages/admin/baseInfo/Tanazor/TanazorPage'
import {Tanazor1Page} from 'app/pages/admin/baseInfo/Tanazor1/Tanazor1Page'
import {PackagingPage} from 'app/pages/admin/baseInfo/Packaging/PackagingPage'
import {EntityFilesPage} from 'app/pages/admin/baseInfo/EntityFiles/EntityFilesPage'
import {FileTypesPage} from 'app/pages/admin/baseInfo/FileTypes/FileTypesPage'
import {ServiceStructurePage} from 'app/pages/admin/baseInfo/ServiceStructure/ServiceStructurePage'
import {PureContentUnitsPage} from 'app/pages/admin/baseInfo/PureContentUnits/PureContentUnitsPage'
import {OriginCountrysPage} from 'app/pages/admin/baseInfo/OriginCountrys/OriginCountrysPage'
import {TargetMarketsPage} from 'app/pages/admin/baseInfo/TargetMarkets/TargetMarketsPage'
import {LanguagesPage} from 'app/pages/admin/baseInfo/Languages/LanguagesPage'
import {UnitOfMeasurementsPage} from 'app/pages/admin/baseInfo/UnitOfMeasurements/UnitOfMeasurementsPage'
import {UnitOfWeightsPage} from 'app/pages/admin/baseInfo/UnitOfWeights/UnitOfWeightsPage'
import {GLNCodeRequestPage} from 'app/pages/admin/baseInfo/GLNCodeRequest/GLNCodeRequestPage'
import {AgreementsPage} from 'app/pages/admin/baseInfo/Agreements/AgreementsPage'
import {MembershipActivityFieldPage} from 'app/pages/admin/baseInfo/MembershipActivityField/MembershipActivityFieldPage'
import {MembershipActivityTypePage} from 'app/pages/admin/baseInfo/MembershipActivityType/MembershipActivityTypePage'
import {MembershipAddressTypePage} from 'app/pages/admin/baseInfo/MembershipAddressType/MembershipAddressTypePage'
import {MembershipAgentTypePage} from 'app/pages/admin/baseInfo/MembershipAgentType/MembershipAgentTypePage'
import {MembershipCompanyTypePage} from 'app/pages/admin/baseInfo/MembershipCompanyType/MembershipCompanyTypePage'
import {ContactInfoPage} from 'app/pages/admin/baseInfo/ContactInfo/ContactInfoPage'
import {PackagesPage} from 'app/pages/admin/baseInfo/Packages/PackagesPage'
import {SubscriptionsPage} from 'app/pages/admin/baseInfo/Subscriptions/SubscriptionsPage'
import {PayGatesPage} from 'app/pages/admin/baseInfo/PayGates/PayGatesPage'
import {ProductsPage} from 'app/pages/admin/baseInfo/Products/ProductsPage'
import {PaymentsPage} from 'app/pages/admin/baseInfo/Payments/PaymentsPage'
import {ShowServiceCodePage} from 'app/pages/admin/baseInfo/ShowServiceCode/ShowServiceCodePage'
import {TariffsPage} from 'app/pages/admin/baseInfo/Tariffs/TariffsPage'
import {RequestStatusesPage} from 'app/pages/admin/baseInfo/RequestStatuses/RequestStatusesPage'
import {ServiceCodeListPage} from 'app/pages/admin/baseInfo/ServiceCodeList/ServiceCodeListPage'
import {MemberListPage} from 'app/pages/admin/baseInfo/MemberList/MemberListPage'
import {GLNListPage} from 'app/pages/admin/baseInfo/GLNList/GLNListPage'
import {GTINListPage} from 'app/pages/admin/baseInfo/GTINList/GTINListPage'
import {MembersPage} from 'app/pages/admin/baseInfo/Members/MembersPage'
import {MemberFactorPage} from 'app/pages/admin/baseInfo/MemberFactor/MemberFactorPage'
import {PreInvoicesListPage} from 'app/pages/admin/baseInfo/PreInvoicesList/PreInvoicesListPage'
export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/role' component={RolePage} />
        <Route path='/admin/base-info/baseNames' component={BaseNamesPage} />
        <Route path='/admin/base-info/worths' component={WorthsPage} />
        <Route path='/admin/base-info/units' component={UnitsPage} />
        <Route path='/admin/base-info/properties' component={PropertiesPage} />
        <Route path='/admin/base-info/users' component={UsersPage} />
        <Route path='/admin/base-info/bank' component={BankPage} />
        <Route path='/admin/base-info/brand' component={BrandPage} />
        <Route path='/admin/base-info/province' component={ProvincePage} />
        <Route path='/admin/base-info/country' component={CountryPage} />
        <Route path='/admin/base-info/city' component={CityPage} />
        <Route path='/admin/base-info/education' component={EducationPage} />
        <Route path='/admin/base-info/shipment' component={ShipmentPage} />
        <Route path='/admin/base-info/company' component={CompanyPage} />
        <Route path='/admin/base-info/countryPort' component={CountryPortPage} />
        <Route path='/admin/base-info/productGroup' component={ProductGroupPage} />
        <Route path='/admin/base-info/packageType' component={PackageTypePage} />
        <Route path='/admin/base-info/violationTitle' component={ViolationTitlePage} />
        <Route path='/admin/base-info/ProductType' component={ProductTypePage} />
        <Route path='/admin/base-info/Activities' component={ActivitiesPage} />
        <Route path='/admin/base-info/AddressType' component={AddressTypePage} />
        <Route path='/admin/base-info/CompanyType' component={CompanyTypePage} />
        <Route path='/admin/base-info/AgentTypes' component={AgentTypesPage} />
        <Route path='/admin/base-info/Fields' component={FieldsPage} />
        <Route path='/admin/base-info/Agents' component={AgentsPage} />
        <Route path='/admin/base-info/Services' component={ServicesPage} />
        <Route path='/admin/base-info/Structure' component={StructurePage} />
        <Route path='/admin/base-info/PayeInfo' component={PayeInfoPage} />
        <Route path='/admin/base-info/ServiceCodeRequest' component={ServiceCodeRequestPage} />
        <Route path='/admin/base-info/IranCodeStructure' component={IranCodeStructurePage} />
        <Route path='/admin/base-info/GPCStructure' component={GPCStructurePage} />
        <Route path='/admin/base-info/ShenaseStructure' component={ShenaseStructurePage} />
        <Route path='/admin/base-info/GTINCodeRequest' component={GTINCodeRequestPage} />
        <Route path='/admin/base-info/Tanazor' component={TanazorPage} />
        <Route path='/admin/base-info/Tanazor1' component={Tanazor1Page} />
        <Route path='/admin/base-info/Packaging' component={PackagingPage} />
        <Route path='/admin/base-info/EntityFiles' component={EntityFilesPage} />
        <Route path='/admin/base-info/FileTypes' component={FileTypesPage} />
        <Route path='/admin/base-info/ServiceStructure' component={ServiceStructurePage} />
        <Route path='/admin/base-info/PureContentUnits' component={PureContentUnitsPage} />
        <Route path='/admin/base-info/OriginCountrys' component={OriginCountrysPage} />
        <Route path='/admin/base-info/TargetMarkets' component={TargetMarketsPage} />
        <Route path='/admin/base-info/Languages' component={LanguagesPage} />
        <Route path='/admin/base-info/UnitOfMeasurements' component={UnitOfMeasurementsPage} />
        <Route path='/admin/base-info/UnitOfWeights' component={UnitOfWeightsPage} />
        <Route path='/admin/base-info/GLNCodeRequest' component={GLNCodeRequestPage} />
        <Route path='/admin/base-info/Agreements' component={AgreementsPage} />
        <Route path='/admin/base-info/MembershipAgentType' component={MembershipAgentTypePage} />
        <Route path='/admin/base-info/ContactInfo' component={ContactInfoPage} />
        <Route path='/admin/base-info/Packages' component={PackagesPage} />
        <Route path='/admin/base-info/Subscriptions' component={SubscriptionsPage} />
        <Route path='/admin/base-info/PayGates' component={PayGatesPage} />
        <Route path='/admin/base-info/Products' component={ProductsPage} />
        <Route path='/admin/base-info/Payments' component={PaymentsPage} />
        <Route path='/admin/base-info/ShowServiceCode' component={ShowServiceCodePage} />
        <Route path='/admin/base-info/Tariffs' component={TariffsPage} />
        <Route path='/admin/base-info/RequestStatuses' component={RequestStatusesPage} />
        <Route path='/admin/base-info/ServiceCodeList' component={ServiceCodeListPage} />
        <Route path='/admin/base-info/MemberList' component={MemberListPage} />
        <Route path='/admin/base-info/GLNList' component={GLNListPage} />
        <Route path='/admin/base-info/GTINList' component={GTINListPage} />
        <Route path='/admin/base-info/Members' component={MembersPage} />
        <Route path='/admin/base-info/MemberFactor' component={MemberFactorPage} />
        <Route path='/admin/base-info/PreInvoicesList' component={PreInvoicesListPage} />

        <Route
          path='/admin/base-info/MembershipCompanyType'
          component={MembershipCompanyTypePage}
        />

        <Route
          path='/admin/base-info/MembershipAddressType'
          component={MembershipAddressTypePage}
        />
        <Route
          path='/admin/base-info/MembershipActivityType'
          component={MembershipActivityTypePage}
        />
        <Route
          path='/admin/base-info/MembershipActivityField'
          component={MembershipActivityFieldPage}
        />
        <Route
          path='/admin/base-info/Report/EmbarkProductQtyAll'
          component={EmbarkProductQtyAllPage}
        />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
