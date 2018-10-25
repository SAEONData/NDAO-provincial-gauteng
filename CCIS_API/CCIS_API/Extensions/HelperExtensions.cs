using CCIS_API.Database.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CCIS_API.Extensions
{
    public static class HelperExtensions
    {
        public static void ClearIdentityValue<T>(T model)
        {
            var identityProp = model.
                        GetType().
                        GetProperties().
                        FirstOrDefault(x => x.Name == "Id" || x.Name == (typeof(T).Name + "Id"));

            if (identityProp != null)
            {
                if(identityProp.GetValue(model) is int)
                {
                    identityProp.SetValue(model, 0);
                }
                else if(identityProp.GetValue(model) is Guid)
                {
                    identityProp.SetValue(model, null);
                }
            }
        }

        public static void ClearNullableInts<T>(T model)
        {
            var nullableIntProps = model.
                                    GetType().
                                    GetProperties().
                                    Where(x => x.PropertyType == typeof(int?));

            foreach (var prop in nullableIntProps)
            {
                prop.SetValue(model, null);
            }
        }

        public static bool CheckGoalCreateValues(Goal goal)
        {
            if(goal.CreateUser == null)
            {
                return false;
            }
            goal.CreateDate = DateTime.Now.ToString("yyyy-MM-dd");

            return true;
        }

        public static bool CheckGoalUpdateValues(Goal goal)
        {
            if (goal.CreateUser == null && goal.UpdateUser == null)
            {
                return false;
            }
            else if(goal.CreateUser != null && goal.UpdateUser == null)
            {
                goal.UpdateUser = goal.CreateUser;
            }
            goal.UpdateDate = DateTime.Now.ToString("yyyy-MM-dd");

            return true;
        }

        public static void LogInternalError(Exception ex)
        {
            if (!Directory.Exists("logs"))
            {
                Directory.CreateDirectory("logs");
            }

            string uid = Guid.NewGuid().ToString();
            File.WriteAllText($"logs\\internalError_{uid}.txt", ex.ToString());
        }
    }
}
