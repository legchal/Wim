import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './app/components/PrivateRoute';


/* auth routes */
import Login from './app/views/login';
import CompanySelection from './app/views/company-selection';

/* routes admin access */
import DashboardAdm from './app/views/dashboard-adm';
import SalesmanRegister from './app/views/salesman-register';
import SalesmanList from './app/views/salesman-list';
import SalesmanSales from './app/views/salesman-sales';
import UsersManage from './app/views/users/users-manage';
import UsersEditing from './app/views/users/user-editing';
import CreateLogin from './app/views/users-adm/new-login';
import ListUsersAdmin from './app/views/users-adm/list';
import ClinicsManage from './app/views/clinics/clinic-manage.js';
import ClinicEditing from './app/views/clinics/clinic-editing';
import ClinicUsers from './app/views/clinics/users-from-clinic';
import RevenuesList from './app/views/revenues/revenues-list';
import NewPayers from './app/views/revenues/new-payers';
import CommissioningList from './app/views/commissioning/list';
import BalanceCommission from './app/views/commissioning/balance-commission';
import InfoSalesman from './app/views/commissioning/info-salesman';
import SalesSalesman from './app/views/commissioning/sales-comission';
import Profile from './app/views/profile';
import CashFlow from './app/views/revenues/cash-flow';
import CalledRegister from './app/views/called/called-register';
import CalledList from './app/views/called/called-list';
import CalledDetails from './app/views/called/called-details';
import GenerateTickets from './app/views/tickets/generate';
import ListTickets from './app/views/tickets/list';
import ForgotPassword from './app/views/RecoveryPassword/index';
import ResetPassword from './app/views/RecoveryPassword/recovery';
import LogsAccess from './app/views/access/index';
import RegisterLogs from './app/views/registerLogs/index';
import UpdateSystem from './app/views/update-system/list'
import Suggestions from './app/views/suggestions/index';


export default function Routes() {
     const permission = localStorage.getItem('@permission');
      
      function VerifyFinanceOrSuper() {
          if (permission === 'super' || permission === 'finance' || permission === 'developer') {
            return true;
          }
          return false;
        }

      function VerifySuperOrSupportOrDeveloper() {
        if (permission === 'super' || permission === 'support' || permission === 'developer') {
          return true;
        }
        return false;
      }

      function VerifySuperOrDeveloper(){
        if(permission === 'super' || permission === 'developer'){
          return true;
        }
        return false;
      }

     return (
          <Switch>
               <Route exact path="/" component={Login} />
               <Route exact path="/login-adm" admin component={Login} />
               <Route exact path="/company-selection" component={CompanySelection} />
               <Route exact path="/forgot-password" component={ForgotPassword} />
               <Route exact path="/reset-password/:token" component={ResetPassword} />

               <PrivateRoute exact path="/dashboard-adm" component={DashboardAdm} />
               <PrivateRoute exact path="/commissioning-list" component={CommissioningList} />
               <PrivateRoute exact path="/balance-commission" component={BalanceCommission} />
               <PrivateRoute exact path="/commission/info-salesman/:id" component={InfoSalesman} />
               <PrivateRoute exact path="/commission/sales/:id" component={SalesSalesman} />
               <PrivateRoute exact path="/profile" component={Profile} />
               <PrivateRoute exact path="/called-register" component={CalledRegister} />
               <PrivateRoute exact path="/called-list" component={CalledList} />
               <PrivateRoute exact path="/called-details/:id" component={CalledDetails}/>
               <PrivateRoute exact path="/update-system" component={UpdateSystem}/>

               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/salesman-register" component={SalesmanRegister} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/sytem-update" component={UpdateSystem} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/salesman-list" component={SalesmanList} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/salesman-sales/:id" component={SalesmanSales} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/create-user" component={CreateLogin} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/edit-user/:id" component={CreateLogin} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/list-users" component={ListUsersAdmin} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/access-list" component={LogsAccess} />
               }
               { VerifyFinanceOrSuper() &&
                <PrivateRoute exact path="/revenues" component={RevenuesList} />
               }
               { VerifyFinanceOrSuper() &&
                <PrivateRoute exact path="/cash-flow" component={CashFlow} />
               }
               { VerifyFinanceOrSuper() &&
                <PrivateRoute exact path="/new-payers" component={NewPayers} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/user-manage" component={UsersManage} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/user-editing/:id" component={UsersEditing} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/clinics-manage" component={ClinicsManage} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/clinics-users/:id" component={ClinicUsers} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/clinic-editing/:id" component={ClinicEditing} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/generate-tickets" component={GenerateTickets} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/ticket-list" component={ListTickets} />
               }
               { VerifySuperOrSupportOrDeveloper() &&
                <PrivateRoute exact path="/register-logs" component={RegisterLogs} />
               }
               { VerifySuperOrDeveloper() &&
                <PrivateRoute exact path="/suggestions" component={Suggestions} />
               }

          </Switch>
     )
}
