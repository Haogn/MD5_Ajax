const getAllCategory = () => {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/category",
    dataType: "JSON",
    success: (response) => {
      //   console.log(response);
      let _html = ``;
      response.forEach((item, index) => {
        _html += `<tr>
                    <td >${index + 1}</td>
                    <td >${item.categoryName}</td>
                    <td >${item.categoryStatus ? "Mở bán" : "Không bán"}</td>
                    <td>
                        <a href="edit-category.html?id=${
                          item.id
                        }"class="btn btn-outline-success edit-cate" >
                            <i class="fa-solid fa-gear"></i>
                        </a>
                        <button onCLick="deleteCate(${
                          item.id
                        })" class="btn btn-outline-danger delete-cate">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                    </tr>`;
      });
      $("#list-category").html(_html);
    },
    error: (err) => {
      console.log(err);
    },
  });
};
getAllCategory();

// add category

$("#addCategory").click(function (e) {
  e.preventDefault();
  // lay du lieu o input
  let name = $("#categoryName").val();
  let status = $('input[name="categoryStatus"]:checked').val();

  if (!name) {
    alert("Name Category Not empty");
    return;
  }

  let newCategory = {
    categoryName: name,
    categoryStatus: status == 1 ? true : false,
  };
  newCategory = JSON.stringify(newCategory);

  // them moi category
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/category",
    dataType: "JSON",
    contentType: "application/json",
    data: newCategory,
    success: (response) => {
      //   console.log(response);
      alert("Add category success");
      getAllCategory();
      window.location.href = "./index.html";
    },
    error: (err) => {
      console.log(err);
    },
  });
});

// delete category
const deleteCate = (id) => {
  $.ajax({
    method: "DELETE",
    url: `http://localhost:8080/category/${id}`,
    contentType: "application/json",
    success: (response) => {
      //   console.log(response);
      alert("Delete category success");
      getAllCategory();
    },
    error: (err) => {
      console.log(err);
    },
  });
};

// findById
const findById = (id) => {
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/category/${id}`,
    dataType: "JSON",
    success: (response) => {
      console.log(response);
      $("#categoryName").val(response.categoryName),
        $('input[name="categoryStatus"]:checked').val(response.categoryStatus);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

// edit
const getCategoryEdit = () => {
  let id = new URL(window.location.href).searchParams.get("id");
  $.ajax({
    method: "GET",
    url: `http://localhost:8080/category/${id}`,
    dataType: "JSON",
    success: (response) => {
      //   console.log(response);
      let _html = `
        <div class="form-group">
                <label for="categoryId">Category ID</label>
                <input type="text" class="form-control" id="categoryId" name="categoryId" value="${
                  response.id
                }"/>
        </div>
        <div class="form-group">
                <label for="categoryName">Category Name</label>
                <input type="text" class="form-control" id="editName" name="categoryName" value="${
                  response.categoryName
                }"/>
        </div>
        <div class="form-group">
                <label>Status</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="language1" ${
                response.categoryStatus ? "checked" : ""
              } name="newStatus"
                  value="1" />
              <label class="form-check-label">Open</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="language2" ${
                response.categoryStatus ? "" : "checked"
              } name="newStatus"
                  value="0" />
              <label class="form-check-label">Close</label>
          </div>
        </div>
        <button id="update" type="submit" class="btn btn-outline-dark">Update</button>`;

      $("#editCategory").html(_html);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

getCategoryEdit();

$("#editCategory").submit(function (e) {
  e.preventDefault();

  let id = $("#categoryId").val();
  let newName = $("#editName").val();
  let newStatus = $('input[name="newStatus"]:checked').val();

  if (!newName) {
    alert("Name Category Not empty");
    return;
  }

  let updateCategory = {
    categoryName: newName,
    categoryStatus: newStatus == 1 ? true : false,
  };
  console.log(updateCategory);
  updateCategory = JSON.stringify(updateCategory);

  console.log(id);

  // Update category
  $.ajax({
    method: "PUT",
    url: `http://localhost:8080/category/${id}`,
    dataType: "JSON",
    contentType: "application/json",
    data: updateCategory,
    success: (response) => {
      console.log(response);
      alert("Update category success");
      window.location.href = "./index.html";
    },
    error: (err) => {
      console.log(err);
    },
  });
});
// update
$("#update").click(function (e) {
  //   e.preventDefault();
  let id = $("#categoryId").val;
  let newName = $("#editName").val();
  let newStatus = $('input[name="newStatus"]:checked').val();

  if (!newName) {
    alert("Name Category Not empty");
    return;
  }

  let updateCategory = {
    categoryName: newName,
    categoryStatus: newStatus == 1 ? true : false,
  };
  console.log(updateCategory);
  updateCategory = JSON.stringify(updateCategory);

  // Update category
  $.ajax({
    method: "PUT",
    url: `http://localhost:8080/category/${id}`,
    dataType: "JSON",
    contentType: "application/json",
    data: updateCategory,
    success: (response) => {
      console.log(response);
      alert("Update category success");
      window.location.href = "./index.html";
    },
    error: (err) => {
      console.log(err);
    },
  });
});
