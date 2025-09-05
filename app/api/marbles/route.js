import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { MarbleModel } from "@/config/models/marbleModel";

const LoadDB = async () => {
    await ConnectDb();
}

export async function GET(req) {
  console.log("GET MARBLES HIT");
  await LoadDB();

  const marbles = await MarbleModel.aggregate([
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
            ],
            default: 999,
          },
        },
        // createdAt yoksa _id zamanını kullan
        _sortCreatedAt: { $ifNull: ["$createdAt", { $toDate: "$_id" }] },
      },
    },

    // Tek alanlı _sortKey oluştur (string halinde)
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

    // Window ile sıra numarası üret
    {
      $setWindowFields: {
        sortBy: { _sortKey: 1 },
        output: { displayNumber: { $documentNumber: {} } },
      },
    },

    // Çıkışı sıralı döndür
    { $sort: { _sortKey: 1 } },

    // Geçici alanları temizle
    { $project: { _sortKey: 0, _sortCreatedAt: 0 } },
  ]);

  console.log("marbles =>", marbles);
  return NextResponse.json({ marbles });
}