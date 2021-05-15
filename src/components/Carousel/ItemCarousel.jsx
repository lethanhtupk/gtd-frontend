import React from 'react';
import { numberWithCommas, truncate } from '../../utils/Helpers';

const ItemCarousel = () => {
  const seed = {
    id: '56740673',
    images: [
      {
        id: 35,
        label: null,
        position: null,
        base_url:
          'https://salt.tikicdn.com/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
        thumbnail_url:
          'https://salt.tikicdn.com/cache/200x280/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
        small_url:
          'https://salt.tikicdn.com/cache/w42/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
        medium_url:
          'https://salt.tikicdn.com/cache/w300/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
        large_url:
          'https://salt.tikicdn.com/cache/w1200/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
        is_gallery: 'True',
        created_at: '2021-05-14T14:03:08.400139Z',
        updated_at: '2021-05-14T14:07:57.570780Z',
        product: '56740673',
      },
      {
        id: 36,
        label: null,
        position: null,
        base_url:
          'https://salt.tikicdn.com/ts/product/90/b9/ed/33f51bceeb60ca40c5636def250259e8.jpg',
        thumbnail_url:
          'https://salt.tikicdn.com/cache/200x280/ts/product/90/b9/ed/33f51bceeb60ca40c5636def250259e8.jpg',
        small_url:
          'https://salt.tikicdn.com/cache/w42/ts/product/90/b9/ed/33f51bceeb60ca40c5636def250259e8.jpg',
        medium_url:
          'https://salt.tikicdn.com/cache/w300/ts/product/90/b9/ed/33f51bceeb60ca40c5636def250259e8.jpg',
        large_url:
          'https://salt.tikicdn.com/cache/w1200/ts/product/90/b9/ed/33f51bceeb60ca40c5636def250259e8.jpg',
        is_gallery: 'True',
        created_at: '2021-05-14T14:03:08.417390Z',
        updated_at: '2021-05-14T14:07:57.587524Z',
        product: '56740673',
      },
      {
        id: 37,
        label: null,
        position: null,
        base_url:
          'https://salt.tikicdn.com/media/catalog/producttmp/ac/4e/7b/e3e1cc0e0aee9da757dbf1f509a73d87.jpg',
        thumbnail_url:
          'https://salt.tikicdn.com/cache/200x280/media/catalog/producttmp/ac/4e/7b/e3e1cc0e0aee9da757dbf1f509a73d87.jpg',
        small_url:
          'https://salt.tikicdn.com/cache/w42/media/catalog/producttmp/ac/4e/7b/e3e1cc0e0aee9da757dbf1f509a73d87.jpg',
        medium_url:
          'https://salt.tikicdn.com/cache/w300/media/catalog/producttmp/ac/4e/7b/e3e1cc0e0aee9da757dbf1f509a73d87.jpg',
        large_url:
          'https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/ac/4e/7b/e3e1cc0e0aee9da757dbf1f509a73d87.jpg',
        is_gallery: 'True',
        created_at: '2021-05-14T14:03:08.434052Z',
        updated_at: '2021-05-14T14:07:57.601536Z',
        product: '56740673',
      },
      {
        id: 38,
        label: null,
        position: null,
        base_url:
          'https://salt.tikicdn.com/media/catalog/producttmp/1e/46/80/0f6cb1620798f527da6213cc413f8b55.jpg',
        thumbnail_url:
          'https://salt.tikicdn.com/cache/200x280/media/catalog/producttmp/1e/46/80/0f6cb1620798f527da6213cc413f8b55.jpg',
        small_url:
          'https://salt.tikicdn.com/cache/w42/media/catalog/producttmp/1e/46/80/0f6cb1620798f527da6213cc413f8b55.jpg',
        medium_url:
          'https://salt.tikicdn.com/cache/w300/media/catalog/producttmp/1e/46/80/0f6cb1620798f527da6213cc413f8b55.jpg',
        large_url:
          'https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/1e/46/80/0f6cb1620798f527da6213cc413f8b55.jpg',
        is_gallery: 'True',
        created_at: '2021-05-14T14:03:08.448999Z',
        updated_at: '2021-05-14T14:07:57.616274Z',
        product: '56740673',
      },
      {
        id: 39,
        label: null,
        position: null,
        base_url:
          'https://salt.tikicdn.com/media/catalog/producttmp/5f/e8/83/c6856e6629468e34aace191720bd1a61.jpg',
        thumbnail_url:
          'https://salt.tikicdn.com/cache/200x280/media/catalog/producttmp/5f/e8/83/c6856e6629468e34aace191720bd1a61.jpg',
        small_url:
          'https://salt.tikicdn.com/cache/w42/media/catalog/producttmp/5f/e8/83/c6856e6629468e34aace191720bd1a61.jpg',
        medium_url:
          'https://salt.tikicdn.com/cache/w300/media/catalog/producttmp/5f/e8/83/c6856e6629468e34aace191720bd1a61.jpg',
        large_url:
          'https://salt.tikicdn.com/cache/w1200/media/catalog/producttmp/5f/e8/83/c6856e6629468e34aace191720bd1a61.jpg',
        is_gallery: 'True',
        created_at: '2021-05-14T14:03:08.464098Z',
        updated_at: '2021-05-14T14:07:57.630847Z',
        product: '56740673',
      },
    ],
    brand: {
      id: 86206,
      name: 'Senka',
      slug: 'senka',
      created_at: '2021-05-14T14:03:08.333198Z',
      updated_at: '2021-05-14T14:07:57.511486Z',
    },
    category: {
      id: 1520,
      name: 'Làm Đẹp - Sức Khỏe',
      is_leaf: false,
      created_at: '2021-04-05T10:26:49.349589Z',
      updated_at: '2021-05-14T14:07:57.527715Z',
    },
    watch_count: 1,
    url_path:
      'combo-sua-rua-mat-danh-cho-da-mun-senka-perfect-whip-acne-care-100g-nuoc-tay-trang-senka-all-clear-white-70ml-p56740673.html?spid=56740674',
    name:
      'Combo Sữa rửa mặt dành cho da mụn Senka Perfect Whip Acne Care 100g + Nước tẩy trang Senka All Clear White 70ml',
    thumbnail_url:
      'https://salt.tikicdn.com/cache/280x280/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
    short_description:
      'https://salt.tikicdn.com/cache/280x280/ts/product/61/6c/66/d24ffc81d826636ee6a614362113a5ee.jpg',
    price: 89000,
    list_price: 170000,
    discount: 81000,
    discount_rate: 48,
    rating_average: 4.7,
    product_group_name:
      'Làm Đẹp - Sức Khỏe/Chăm sóc da mặt/Làm sạch da mặt/Sữa rửa mặt/Sạch nhờn, ngừa mụn',
    description:
      "<span class='description-separate'></span>Chiết xuất Hoa Cúc Cam từ vùng Kyoto, Nhật Bản<br />\nLàm sạch bụi bẩn và bã nhờn sâu trong lỗ chân lông<br />\nKháng khuẩn, ngừa viêm, giảm thâm mụn hiệu quả<br />\nBảo vệ màn ẩm tự nhiên của da<br />\nMang đến làn da mịn màng, trắng sáng<br />\nNước tẩy trang công nghệ Micellar<br />\nLàm sạch da hiệu quả<br />\nBao bì sản phẩm có thể thay đổi tùy theo đợt nhập hàng<p>Bộ sản phẩm bao gồm:<br />01 x Sữa rửa mặt dành cho da mụn Senka Perfect Whip Acne Care 100g<br />01 x Nước tẩy trang SENKA A.L.L. CLEAR WATER Micellar Formula White 70ml</p>\n<p> </p>\n<p>THÔNG TIN CHI TIẾT<br />1. Sữa rửa mặt dành cho da mụn Senka Perfect Whip Acne Care 100g<br />Thành phần:<br />- Salicylic Acid: Làm sạch sâu và cuốn sạch bụi bẩn, bã nhờn, tế bào chết, phấn trang điểm bịt kín lỗ chân lông và gây mụn cho làn da sạch, rạng rỡ.<br />- Chiết xuất từ Cúc Cam Kyoto giúp chống viêm nhiễm và oxi hóa, ngăn chặn tác nhân gây hại, làm dịu da và tăng sức đề kháng cho da.<br />- Tinh chất tơ tằm trắng cùng với công thức gấp đôi Hyaluronic acid duy trì lớp màng dưỡng ẩm tự nhiên giúp da sáng mịn và mềm mượt</p>\n<p>Công dụng<br />- Làm sạch bụi bẩn, bã nhờn, tế bào da chết nằm sâu trong lỗ chân lông, giúp giảm nhờn, bóng dầu, bảo vệ da trước những tác nhân gây mụn<br />- Giúp da kháng khuẩn, chống oxi hóa, thanh lọc làn da<br />- Cung cấp độ ẩm cho làn da sạch thoáng, ẩm mịn &amp; sáng rạng rỡ<br /><br />Hướng dẫn sử dụng:<br />- Làm ướt tay. Lấy một lượng vừa đủ (khoảng 2 - 3 cm) ra lòng bàn tay. Tạo thật nhiều bọt với một ít nước.<br />- Mát-xa da mặt với bọt theo chuyển động tròn. Rửa lại thật sạch với nước.</p>\n<p> </p>\n<p>2. Nước tẩy trang SENKA A.L.L. CLEAR WATER Micellar Formula White 70ml<br />Công dụng<br />- Nhẹ nhàng làm sạch 3 lớp: cặn trang điểm - dầu thừa - bụi bẩn và ô nhiễm.<br />- Công thức mới, dưỡng trắng và giảm thiểu tình trạng sạm nám.<br />- Không những làm sạch mà còn dưỡng ẩm, không gây khô căng sau khi sử dụng.<br />- Mang lại hương thơm dễ chịu, tươi mát cho da.</p>\n<p>Thành phần<br />- Chiết xuất hoa anh đào từ vùng núi Fuji Nhật Bản, không những nhẹ nhàng làm sạch da mà còn dưỡng trắng, tăng cường độ đàn hồi, chống oxy hóa cho da, thúc đẩy tái sinh tế bào da.<br />- Trà xanh Uji Nhật Bản: Chiết xuất từ những lá trà xanh hảo hạng được hái từ vùng núi Uji Nhật Bản – với ngành trồng trà truyền thống từ thế kỷ 12. Trà xanh chứa các hợp chất chống oxy hóa và giàu vitamin E, giúp làm sạch da, ngăn ngừa các tác nhân gây mụn và chống lão hóa.<br />- Công nghệ Micell cuốn bay cặn trang điểm: Công thức chứa những phân tử hình cầu nhỏ gọi là mi-xen (micelles). Những phân tử chứa 2 thành phần là Hydrophobic và Hydrophilic. Phần hydrophobic hút tạp chất mà không làm khô da và phần hydrophilic sẽ hòa tan trong nước.<br />- Công nghệ Giữ ẩm độc quyền “Aqua in Pool”: Được sáng chế bởi tập đoàn Shiseido, công nghệ làm sạch chọn lọc giúp lấy đi bụi bẩn và bã nhờn nhưng vẫn giữ lại độ ẩm tự nhiên của da, giúp tăng cường hiệu quả của các thành phần dưỡng ẩm khác.<br />- Chiết xuất từ lõi Tơ tằm trắng &amp; Gấp đôi Hyaluronic acid: Chiết xuất từ thành phần kén Tơ Tằm trắng tự nhiên chứa hàm lượng chất dưỡng ẩm tinh khiết cao nhất. Hyaluronic acid và Super hyaluronic acid với kích thước phân tử nhỏ hơn mang lại hiệu quả dưỡng ẩm chuyên sâu.</p>\n<p>Hướng dẫn sử dụng<br />- Bước 1: Làm sạch tay.<br />- Bước 2: Thấm một lượng sản phẩm vửa đủ (khoảng 3 lần ấn) ra bông tây trang.<br />- Bước 3: Nhẹ nhàng lau sạch lớp trang điểm, không cần rửa lại bằng nước.</p>\n<p>Ngày sản xuất: Xem NSX trên bao bì sản phẩm (Ngày/Tháng/Năm)<br />Hạn sử dụng: 3 năm kể từ NSX<br />Xuất xứ thương hiệu: Nhật Bản<br />Nơi sản xuất: Nhật Bản</p>\n<p>THÔNG TIN THƯƠNG HIỆU<br />Ra đời năm 2002 tại Nhật Bản, nhãn hiệu Senka thừa hưởng lịch sử 140 năm của Tập đoàn Shiseido để mang đến những sản phẩm dưỡng da hiệu quả và an toàn với làn da phụ nữ châu Á. Với sản phẩm đại diện Senka Perfect Whip đứng đầu thị trường sữa rửa mặt Nhật Bản trong 7 năm liền (từ 2008 đến 2015), Senka mong muốn chăm sóc những người phụ nữ bận rộn một cách hiệu quả và tinh tế nhất.</p><p>Giá sản phẩm trên Tiki đã bao gồm thuế theo luật hiện hành. Tuy nhiên tuỳ vào từng loại sản phẩm hoặc phương thức, địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ phí hàng cồng kềnh, ...</p>",
    created_at: '2021-05-14T14:03:08.378370Z',
    updated_at: '2021-05-14T14:07:57.555823Z',
    seller: 6423,
  };
  return (
    <div className="item-carousel border border-gray-500 pb-2 bg-white">
      <div className="image">
        <img src={seed.thumbnail_url} alt="product" className="w-full" />
      </div>
      <div className="detail px-8 flex flex-col items-center">
        <a
          href="/product-detail"
          className="title text-blue-500 text-lg hover:text-blue-600 hover:underline"
        >
          {truncate(seed.name)}
        </a>
        <p className="text-green-400 text-2xl mt-4">
          {numberWithCommas(seed.price)} đ
        </p>
        <p className="text-gray-500 text-sm mb-2">
          List price: {numberWithCommas(seed.list_price)}
        </p>
        <button
          type="button"
          className="text-lg font-semibold py-2 w-full bg-yellow-300 hover:bg-yellow-400 rounded-lg"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ItemCarousel;
