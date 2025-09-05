import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { MarbleModel } from "@/config/models/marbleModel";

const LoadDB = async () => {
    await ConnectDb();
}
export async function GET(request, { params }) {
  console.log("Marble List GET HIT");
  await LoadDB();

  const marbleType = params.marbleType; // params içinden alıyoruz

  const marbles = await MarbleModel.aggregate([
    // İlgili türü filtrele
    

    // 1) categoryOrder üret (marbleType -> sıra)
    {
      $addFields: {
        categoryOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$marbleType", "DÜZ MEZAR"] }, then: 1 },
              { case: { $eq: ["$marbleType", "BABALI MEZAR"] }, then: 2 },
              { case: { $eq: ["$marbleType", "ÇİFTLİ MEZAR"] }, then: 3 },
              { case: { $eq: ["$marbleType", "BEBEK MEZARI"] }, then: 4 },
              { case: { $eq: ["$marbleType", "ÇEŞME"] }, then: 5 },
              // diğer türler...
            ],
            default: 999,
          },
        },
        // createdAt yoksa _id zamanını kullan
        _sortCreatedAt: { $ifNull: ["$createdAt", { $toDate: "$_id" }] },
      },
    },

    // 2) Tek alanlı bileşik anahtar (string halinde)
    {
      $addFields: {
        _sortKey: {
          $concat: [
            { $toString: "$categoryOrder" }, "_",
            { $toString: "$marblePrice"} , "-",
            { $toString: "$_id" },
          ],
        },
      },
    },

    // 3) Window: sıra numarası üret
    {
      $setWindowFields: {
        sortBy: { _sortKey: 1 },
        output: { displayNumber: { $documentNumber: {} } },
      },
    },
    { $match: { marbleType } },
    
    // 4) Çıkışı sıralı döndür
    { $sort: { _sortKey: 1 } },

    // 5) Geçici alanları temizle
    { $project: { _sortKey: 0, _sortCreatedAt: 0 } },
  ]);

  console.log("marbles =>", marbles);
  return NextResponse.json({ marbles });
}

/*export async function GET(request, { params }) {
    console.log("Marble List GET HIT");
    await LoadDB();
    const params2 = await params
    const pageNumber = await params2.pageNumber;
    const marblePerPage = 6;
    const marbleCount = await MarbleModel.countDocuments();
    if (marbleCount > marblePerPage * pageNumber) {
        //return the requested page
        const marbles = await MarbleModel.find({}).skip((pageNumber - 1) * marblePerPage).limit(marblePerPage)
        return NextResponse.json({ marbles, isLastPage: false, marbleCount: marbleCount });
    }
    else {
        //return last page
        if (marbleCount > 6) {
            const marbles = await MarbleModel.find({}).skip(marbleCount-(marbleCount%6)).limit(marblePerPage)
            return NextResponse.json({ marbles, isLastPage: true, marbleCount: marbleCount });
        }
        else {
            const marbles = await MarbleModel.find({}).limit(marblePerPage)
            return NextResponse.json({ marbles, isLastPage: true, marbleCount: marbleCount });
        }
    }

}
*/
