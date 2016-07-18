(function(){
    'use strict';

    angular
        .module("app.admin")
        .factory("adminService",adminService);

        adminService.$inject = ["$http"];

        function adminService($http) {
            return{
                getAdmins:getAdmins,
                deleteAdmin:deleteAdmin,
                editAdmin:editAdmin
            };


            function getAdmins() {
                var url = "http://dtapi.local/AdminUser/getRecords";
                return $http.get(url)
                    .then(complete)
                    .catch(failed);
            };

            function editAdmin(id,obj) {
                var url = "/AdminUser/update/" + id;
                return $http.post(url,obj)
                    .then(complete)
                    .catch(failed);
            };

            function deleteAdmin(id) {
                var url = "/AdminUser/del/" + id;
                return $http.post(url)
                    .then(complete)
                    .catch(failed);
            };

            function complete(response) {
                return response.data;
            }

            function failed(error) {
                alert("XHR Failed. Error: " + error.data);
            }
        }
})();
