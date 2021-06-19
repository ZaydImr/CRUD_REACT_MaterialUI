using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Newtonsoft.Json;
using Microsoft.JScript;
using System.Net.Http;
using System.Web.Script.Serialization;

namespace WebService
{
    /// <summary>
    /// Summary description for Service
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class Service : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod]
        public string CheckUser(string user,string pass)
        {
     
            SqlConnection cn = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
            cn.Open();
            SqlCommand com = new SqlCommand("select Fullname from Users where username like @user and password like @pass", cn);
            com.Parameters.Add(new SqlParameter("@user", user));
            com.Parameters.Add(new SqlParameter("@pass", pass));
            if (com.ExecuteScalar() == null)
                return "";
            else
                return  new JavaScriptSerializer().Serialize(com.ExecuteScalar().ToString());
        }
    }
}
