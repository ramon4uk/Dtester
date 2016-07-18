(function(){
    'use strict';

    angular
        .module("app.admin")
        .controller("AdminEditController", AdminEditController);

    AdminEditController.$inject = ["adminService"];

    function AdminEditController(adminService) {
        var vm = this;
        vm.edit = edit;
        vm.hideForm =hideForm;
        vm.update = update;
        vm.remove = remove;
        vm.array = [];
        vm.show = false;
        vm.currentId=0;
        vm.name = "";
        vm.password = "";
        vm.email ="";

        activate();

        function activate() {
     //       adminService.login();
            return adminService.getAdmins().then(function (data) {
                vm.array = data;
                return vm.array;
            });
        }

        function hideForm() {
            vm.show = false;
        }

        function edit(id) {
            vm.show = true;
            vm.currentId =id;
        }

        function update(param){
            var obj;
            if (param == "name") {
                obj = {username:vm.name};
                adminService.editAdmin(vm.currentId,obj);
                vm.name ="";
            }
            else if (param == "password") {
                obj = {password:vm.password};
                adminService.editAdmin(vm.currentId,obj);
                vm.password ="";
            }
            else {
                obj = {email:vm.email};
                adminService.editAdmin(vm.currentId,obj);
                vm.email ="";
            }
            activate();
        }

        function remove(id) {
            adminService.deleteAdmin(id);
            activate();
        }
    }
})();