class Expense < ApplicationRecord
  belongs_to :user
  has_many :expense_tags, dependent: :destroy
  has_many :tags, through: :expense_tags
  has_one_attached :image

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true
  validates :place, presence: true
  validate :acceptable_image

  def acceptable_image
    return unless image.attached?

    unless image.blob.byte_size <= 5.megabyte
      errors.add(:image, "is too big (maximum is 5MB)")
    end

    acceptable_types = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/vnd.microsoft.icon",
      "image/x-icon"
    ]
    
    unless acceptable_types.include?(image.blob.content_type)
      errors.add(:image, "must be a JPEG, PNG, GIF, WebP, or ICO file")
    end
  end
end
