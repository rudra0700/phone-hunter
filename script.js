const loadAllPhones = async (status, brandName) => {
    console.log(brandName);
    
  document.getElementById("spinner").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : "iphone"}`
  );
  const data = await response.json();
  if(status){
      displayAllPhones(data.data)
  }else{
    displayAllPhones(data.data.slice(0, 6));
  }

};

const displayAllPhones = (phones) => {
console.log(phones);
};

const handleShowAll = () =>{
  loadAllPhones(true)
  
}

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  const searchText = document.getElementById("search-box").value;
  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 3000);
};

// loadAllPhones(false, "iphone");
