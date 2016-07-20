(function(){
    'use strict';

    angular
        .module("app.admin")
        .controller("AdminEditController", AdminEditController);

    AdminEditController.$inject = ["adminService"];

    function AdminEditController(adminService) {
        var self = this;
        self.edit = edit;
        self.hideForm =hideForm;
        self.update = update;
        self.remove = remove;
        self.setPassword = setPassword;
        self.array = [];
        self.show = false;
        self.password = "";
        self.currentObj = {};


        activate();

        function activate() {
            adminService.login();
            return adminService.getAdmins().then(function (data) {
                self.array = data;
                return self.array;
            });
        }

        function hideForm() {
            self.show = false;
        }

        function setPassword() {
            self.currentObj.password = self.password;
            self.password ="";
            alert("Новий пароль встановлено. Щоб його зберегти слід натиснути кнопку 'Підтвердити'")
        }

        function edit(obj) {
            self.show = true;
            console.log(obj)
            self.currentObj = obj;
        }

        function update(){
            console.log(self.currentObj)
            adminService.editAdmin(self.currentObj.id,self.currentObj);
            activate();
            hideForm()
        }

        function remove(id) {
            adminService.deleteAdmin(id);
            activate();
        }
    }
})();