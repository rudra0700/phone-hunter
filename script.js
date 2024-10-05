const loadAllPhones = async (status, brandName) => {
  document.getElementById("spinner").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );
  const data = await response.json();
  if (status) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 6));
  }
};

const displayAllPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  phones.forEach((phone) => {
    const { brand, image, slug } = phone;
    const card = document.createElement("div");
    card.classList.add("card", "bg-base-100", "w-96", "shadow-xl");
    card.innerHTML = `
    <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button class="btn btn-primary" onclick="showPhoneDetails('${slug}')">show details</button>
    </div>
  </div>
    `;

    phonesContainer.appendChild(card);
  });
};



const showPhoneDetails = async (slugs) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slugs}`
  );
  const data = await res.json();
  const {brand, slug, name, image} = data.data
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
  <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
       <div class="text-center space-y-3">
         <img src="${image}" class="mx-auto" />
         <h3 class="font-bold>${brand}</h3>
         <h5 class="font-bold>${name}</h5>
          <h6 class="font-bold">${slug}</h6>
       </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  `;
  my_modal_1.showModal()
};

const handleShowAll = () => {
  const searchText = document.getElementById("search-box").value;
  loadAllPhones(true, searchText);
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchText = document.getElementById("search-box").value;
  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 3000);
};


