var adminManager = new ActiveXObject('Microsoft.ApplicationHost.WritableAdminManager');
adminManager.CommitPath = "MACHINE/WEBROOT/APPHOST";
var sitesSection = adminManager.GetAdminSection("system.applicationHost/sites", "MACHINE/WEBROOT/APPHOST");
var sitesCollection = sitesSection.Collection;

var siteElementPos = FindElement(sitesCollection, "site", ["name", "ftp.example.com"]);
if (siteElementPos == -1) throw "Element not found!";
var siteElement = sitesCollection.Item(siteElementPos);
var ftpServerElement = siteElement.ChildElements.Item("ftpServer");

var firewallSupportElement = ftpServerElement.ChildElements.Item("firewallSupport");
firewallSupportElement.Properties.Item("externalIp4Address").Value = "10.0.0.1";

adminManager.CommitChanges();

function FindElement(collection, elementTagName, valuesToMatch) {
   for (var i = 0; i < collection.Count; i++) {
      var element = collection.Item(i);
      if (element.Name == elementTagName) {
         var matches = true;
         for (var iVal = 0; iVal < valuesToMatch.length; iVal += 2) {
            var property = element.GetPropertyByName(valuesToMatch[iVal]);
            var value = property.Value;
            if (value != null) {
               value = value.toString();
            }
            if (value != valuesToMatch[iVal + 1]) {
               matches = false;
               break;
            }
         }
         if (matches) {
            return i;
         }
      }
   }
   return -1;
}