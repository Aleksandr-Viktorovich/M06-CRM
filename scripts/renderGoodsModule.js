import {modalCount, modalPrice, table, totalModal, totalTable} from "./elementsDOMmodule.js";
import {createRow} from "./createGoodsModule.js";
import {removeStorage} from "./storageModule.js";

export const renderGoods = (arrGoods) => {
  arrGoods.forEach(item => {
    table.append(createRow(item.id, item.title, item.category, item.units, item.count, item.price, item.count * item.price));
    });

    let sum = arrGoods.reduce((acc, item) => acc + (item.price * item.count), 0);
    totalTable.textContent = `$ ${+sum}`;

    modalCount.addEventListener('blur', () => {
      if (modalCount.value !== '' && modalPrice.value !== '') {
        totalModal.textContent = `$ ${+modalCount.value * +modalPrice.value}`;
      }

      modalPrice.addEventListener('blur', () => {
        if (modalCount.value !== '' && modalPrice.value !== '') {
          totalModal.textContent = `$ ${+modalCount.value * +modalPrice.value}`;
        }
      });
    });
};

table.addEventListener('click', e => {
  const imgBtn = document.querySelector('.table__btn-img');
  const urlImg = imgBtn.getAttribute('data-picture');
  const target = e.target;
  if (target.closest('.table__btn-close')) {
    const goodsName = target.closest('.table__row');
    goodsName.remove();
    const goodsItem = goodsName.querySelector('.goods__id').textContent;
    removeStorage(goodsItem, 'key');
  }
  if (target.closest('.table__btn-img')) {
    open(`${urlImg}`, '', 'width=600, height=600, top=200, left=650');
  }
});

