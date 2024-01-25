$(document).ready(function() {
    let progress = 0;
    const progressBar = $('#progress-bar');
    const loadingContent = $('#loading-content');
    const paginatedContent = $('#paginated-content');
    const pauseBtn = $('#pause-btn');
    let intervalId;
  
    function fetchData() {
      intervalId = setInterval(function() {
        if (progress < 100) {
          progress += 10;
          progressBar.width(progress + '%');
        } else {
          clearInterval(intervalId);
          loadingContent.hide();
          paginatedContent.show();
          paginationFn();
        }
      }, 1000);
    }
  
    fetchData();
  
    pauseBtn.click(function() {
      if (pauseBtn.text() === 'Pause') {
        clearInterval(intervalId);
        pauseBtn.text('Resume');
      } else {
        fetchData();
        pauseBtn.text('Pause');
      }
    });


    function paginationFn() {

        const app = document.getElementById("app");
        const containersData = generateData(20, 8);

        console.log(app);

        let currentPage = 1;
        const cardsPerPage = 6;
        const totalPages = Math.ceil(containersData.length / cardsPerPage);

        function generateData(containerCount, pillsCount) {
          const data = [];
          for (let i = 0; i < containerCount; i++) {
            const container = [];
            for (let j = 0; j < pillsCount; j++) {
              container.push(`Data ${i * pillsCount + j + 1}`);
            }
            data.push(container);
          }
          return data;
        }

        function renderCards(page) {
          const start = (page - 1) * cardsPerPage;
          const end = start + cardsPerPage;
          const currentData = containersData.slice(start, end);

          app.innerHTML = "";
          currentData.forEach((containerData, index) => {
            const container = document.createElement("div");
            container.className = "container";

            containerData.forEach((pillData) => {
              const card = document.createElement("div");
              card.className = "card";
              card.textContent = pillData;
              container.appendChild(card);
            });

            app.appendChild(container);
          });

          renderPagination();
        }

        function renderPagination() {
          const pagination = document.createElement("ul");
          pagination.className = "pagination";

          for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.textContent = i;
            li.addEventListener("click", () => handlePageClick(i));
            if (i === currentPage) {
              li.classList.add("active");
            }
            pagination.appendChild(li);
          }

          app.appendChild(pagination);
        }

        function handlePageClick(page) {
          currentPage = page;
          renderCards(currentPage);
        }

        renderCards(currentPage);

    }



  });
  